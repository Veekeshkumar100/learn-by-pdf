import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDocumentbyid } from '../../services/documentServise';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Spinner from '../../component/common/spinar';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

import PageTitle from '../../component/common/PageTitle';
import Tab from '../../component/common/Tab';
import ChatInstance from '../../component/chat/ChatInstance';
import AiAction from '../../component/ai/AiAction';
import FlashCardPage from '../../component/flascard/FlashCardPage';

const DocumentsDetailPage = () => {
    const {id}= useParams();
    const [document,setDocument]=useState(null)
    const [loading,setLoading]=useState(false)
    const [active,setActive]=useState("Content")
    const fetchDocumentById=async(id)=>{
        setLoading(true)
        try {
            const responce = await getDocumentbyid(id);
            console.log(responce);
            setDocument(responce.data);
            setLoading(false)
        } catch (error) {
            console.log(error)
              setLoading(false)
              toast.error(error.meggage || "document details not found");   
        }
    }
    useEffect(()=>{
     fetchDocumentById(id);
    },[id])

  


const renderDocument = () => {

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if (!document || !document?.fileName) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-slate-200 text-slate-600">
          No document found
        </div>
      </div>
    );
  }

console.log(document?.filePath);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Document Viewer
        </h2>
        <a href={`${document?.filePath}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg 
          bg-emerald-500 text-white font-medium
          hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg">
  <ExternalLink size={18} strokeWidth={2} />
          Open in new tab
</a>
      </div>
      {/* PDF Viewer */}
      <div className="w-full h-[85vh] bg-white rounded-2xl 
      shadow-2xl border border-slate-200 overflow-hidden">
        
        <iframe
          src={`${document?.filePath}`}
          title="PDF Viewer"
          className="w-full h-full"
          frameBorder="0"
          style={{ colorScheme: "light" }}
        />
      </div>
    </div>
  );
};

const renderChat=()=>{
    return <ChatInstance/>;
}
const renderAiAction=()=>{
  return  <AiAction/>
}

const renderFlashCard=()=>{
    return <FlashCardPage/>;
}
const renderQuizzs=()=>{
    return "renderQuizzs";
}

    const tabs=[
        {name:"Content",label:"Content",content:renderDocument},
        {name:"AI Action",label:"AI Action",content:renderAiAction},
        {name:"Chat",label:"Chat",content:renderChat},
        {name:"FlashCard",label:"FlashCard",content:renderFlashCard},
        {name:"Quizs",label:"Quizs",content:renderQuizzs},
    ]
  
    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Spinner />
      </div>
    );
  }
  if(!document){
    return "document not found"
  }

  return (
    <div className='m-4'>
      <div className= "mb-3">
        <Link  to="/documents" className=' inline-flex p-3 bg text-sm  rounded-2xl bg-emerald-400  items-center gap-2  text-white  cursor-pointer'>
        <ArrowLeft strokeWidth={2} size={18}/>
          Back to Document 
        </Link>
      </div>
      <PageTitle title={document?.title}/>
      <Tab tab={tabs} active={active} setActive={setActive}/>
    </div>
  )
}

export default DocumentsDetailPage
