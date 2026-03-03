import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Chating, generateChatHistory } from '../../services/aiServices';
import { useRef } from 'react';
import { Loader2, MessageSquare } from 'lucide-react';
import Spinner from '../common/spinar';
import MessageInput from '../common/sendMesaage';
import { useEffect } from 'react';

const ChatInstance = () => {
   const {id} =useParams();
   const [loading,SetLoading]=useState(false);
    const [message,SetMessage]=useState('');
    const [history,SetHistory]=useState([]);
    const [initialLoading,SetinitialLoading]=useState(null);
      const bottomRef = useRef(null);

  // Auto scroll to bottom when messages update


  const fetchChatHistory=async(id)=>{
    try {
        SetinitialLoading(true)
        const responce =await generateChatHistory(id)
       SetHistory(responce.messagedata);    
    } catch (error) {
         console.log(error.message ||"Fialed to fetched chat history")
    } finally{
        SetinitialLoading(false);
    }
  } 
    useState(()=>{
     fetchChatHistory(id);
    },[id])


    const handleSendMessage=async(e)=>{
         if(!message.trim()) return null;
         console.log(
    "msg",message
         )
         const userMesaagse = {role:"user",content:message,timestamp:new Date()}
         SetHistory(pre=>[...pre,userMesaagse]);
         SetMessage('');
         SetLoading(true);
         try {
            const responce= await Chating(userMesaagse.content,id);
            console.log(responce);
            const  assistantMessage = {role:"assistant",content:responce.data.chatAnwer,timestamp:new Date(),relevantChunks:responce.relevantChunks}
             SetHistory(pre=>[...pre,assistantMessage]);
             console.log(history);
         } catch (error) {
          console.log(error.message || "Failed to fetch answer") ; 
          const errorMessage ={role:"assistant",content:'sory I am encounter an error ,please try again',timestamp:new Date(),relevantChunks:responce.relevantChunks}
           SetHistory(pre=>[pre,...errorMessage]);
         }finally{
            SetLoading(false);
         }

    }

    if(initialLoading){
   return <div className="relative w-full h-full min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      
      {/* Logo */}
      <div className="mb-6">
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-emerald-100">
          <MessageSquare className="w-10 h-10 text-emerald-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
        Loading Chat  History...
      </h2>

      

      {/* Loading State */}
    
        <div className="mt-6 flex flex-col items-center gap-3">
          <Spinner/>
        </div>
    </div>
    }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message,history]);

  return (
  <div className='w-full h-full'>
    {history.length==0 ? (
  <div className="relative w-full h-full min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      
      {/* Logo */}
      <div className="mb-6">
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-emerald-100">
          <MessageSquare className="w-10 h-10 text-emerald-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
        No Message History
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md">
        Your conversations will appear here once you start chatting.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          
          <Spinner/>
        
        </div>
      )}

<MessageInput
  value={message}
  onChange={(e) => SetMessage(e.target.value)}
  onSend={handleSendMessage}
/>
    </div>
    ):(
        <div className="w-full h-full flex flex-col">
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 space-y-6 scroll-smooth">
        
        {history.map((msg, index) => (
            
        <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Message Bubble */}
            <div
              className={`
                max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]
                px-4 py-3
                rounded-2xl
                text-sm sm:text-base
                shadow-sm
                transition-all duration-300
                ${
                  msg.role === "user"
                    ? "bg-emerald-500 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-800 rounded-bl-md"
                }
              `}
            >
              <p className="whitespace-pre-wrap break-words">
                {msg.content}
              </p>

              {/* Timestamp */}
              <span
                className={`
                  block mt-2 text-[10px] sm:text-xs opacity-70
                  ${
                    msg.role === "user"
                      ? "text-emerald-100"
                      : "text-slate-500"
                  }
                `}
              >
                {new Date(msg.timeStamp).toLocaleTimeString()}
              </span>

            </div>

          </div>
        ))}
            {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm">
              <Loader2 className="animate-spin text-emerald-500" size={16} />
              <span className="text-sm text-slate-500">
                Assistant is typing...
              </span>
            </div>
          </div>
        )}
         {/* Auto Scroll Anchor */}
        
        
        <MessageInput 
  value={message}
  onChange={(e) => SetMessage(e.target.value)}
  onSend={handleSendMessage}
/>   
 <div ref={bottomRef} />
      </div>
    </div>
    )
    }
   
  </div>
    

  )
}

export default ChatInstance
