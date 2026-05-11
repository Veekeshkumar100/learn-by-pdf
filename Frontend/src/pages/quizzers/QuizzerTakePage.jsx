
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, FileQuestion } from "lucide-react";
import { getQuize, submitequizesAnswer } from "../../services/quizeService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const QuizzerTakePage = () => {
  
//   {
//     questionText: "What is Node.js?",
//     options: [
//       "Programming language",
//       "JavaScript runtime",
//       "Database",
//       "Operating system"
//     ],
//     correctAnswer: "JavaScript runtime"
//   },
//   {
//     questionText: "What is Node.js?",
//     options: [
//       "Programming language",
//       "JavaScript runtime",
//       "Database",
//       "Operating system"
//     ],
//     correctAnswer: "JavaScript runtime"
//   },
//   {
//     questionText: "What is Node.js?",
//     options: [
//       "Programming language",
//       "JavaScript runtime",
//       "Database",
//       "Operating system"
//     ],
//     correctAnswer: "JavaScript runtime"
//   },
//   {
//     questionText: "What is Node.js?",
//     options: [
//       "Programming language",
//       "JavaScript runtime",
//       "Database",
//       "Operating system"
//     ],
//     correctAnswer: "JavaScript runtime"
//   },
//   {
//     questionText: "What is Node.js?",
//     options: [
//       "Programming language",
//       "JavaScript runtime",
//       "Database",
//       "Operating system"
//     ],
//     correctAnswer: "JavaScript runtime"
//   },
// ];
  const {quizId}=useParams()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizz,setQuizz]=useState(null)
  const [loading ,setLoading]=useState(false)
  const [answers, setAnswers] = useState({});
  const [submiting ,setSubmiting]=useState(false)
    const navigate =useNavigate();

   useEffect(()=>{
     const fetchQuizzData = async () => {
      setLoading(true);
      try {
       const quizz= await getQuize(quizId);
         setQuizz(quizz.data)
        toast.success("Quizz fatched successfully");
      } catch (error) {
        toast.error("Fialed to Quizz generating");
        console.log(error.message || "fialed to fatch document");
      } finally {
        setLoading(false);
      }
    };
fetchQuizzData()
   },[quizId]);

  const questions = quizz?.questions;
  const currentQuestion = quizz?.questions[currentIndex];
  const progress = ((currentIndex + 1) / quizz?.questions.length) * 100;

  const  optionLetters = ["A", "B", "C", "D"];
  const answeredCount = Object.keys(answers).length;

  
  const handleOptionChange = (questionId,optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handlesubmitQuizz=async()=>{
    setSubmiting(true)
     try{
      const formatAnswer = Object.keys(answers).map(questionId=>{
       const question = quizz?.questions?.find(q=>q._id===questionId); 
       const questionIndex = quizz?.questions.findIndex(q=>q._id===questionId);
       const optionIndex= answers[questionId];
       const selectedAnswer = question.options[optionIndex]
        return {questionIndex,selectedAnswer} 
      })

       const res=await submitequizesAnswer(formatAnswer,quizId)
       toast.success("Quizz submiting successfully");
       navigate(`/quizz/${quizId}/result`);


     }catch(error){
      toast.error(error.message || "Failed to submiting Quizz");
      console.log(error)
     }finally{
      setSubmiting(false)
     }
  }


  if(!quizz && !quizz?.data){
    return <div className="min-h-[70vh] flex items-center justify-center px-4">

      <div className="max-w-md w-full bg-white border border-purple-100 shadow-lg rounded-2xl p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 p-4 rounded-full">
            <FileQuestion className="text-purple-600" size={32} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Quiz Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          The quiz you are looking for does not exist or may have been removed.
        </p>

        {/* Button */}
        <button
          className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
        >
          Go Back
        </button>

      </div>
    </div>
  }

  return (
    <div className="min-h-screen w-full   py-12 px-4">
      
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{quizz?.title}</h1>
         {/* Title */}
        <div className="w-[90%] mt-6 flex justify-between">

          <p className="text-sm text-gray-500 mt-1">
            Question {currentIndex + 1} of {quizz?.questions.length}
          </p>
          <div className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Answered {answeredCount}/{quizz?.questions.length}
          </div>
        
        </div>

       
   {/* Progress */}
        <div className="w-[90%] h-3 bg-gray-200 rounded-full overflow-hidden mb-10 mt-2">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
   
       
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 border border-purple-100">
         <div className="text-sm px-2 py-1 mb-4 text-purple-700 rounded-lg gap-2 inline-flex  items-center  bg-purple-100 border-2 border-purple-400 ">
          <div className=" border-3 bg-purple-700 rounded-full"/>
         <p>Question</p>
        {currentIndex + 1} 
       </div>
              {/* Question */}
         <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
            {quizz?.questions[currentIndex].questionText?.replace(/\["|"\]/g, "")}
          </h2>
        </div>

        {/* Options */}
        <div className="grid gap-4 mb-10">

          {currentQuestion?.options?.map((opt, index) => {
            const selected = answers[currentQuestion._id] === index;;
            
            return (
              <button
                key={index}
                onClick={() => handleOptionChange(currentQuestion._id,index)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                ${
                  selected
                    ? "bg-purple-500 text-white border-purple-500 shadow-md"
                    : "border-gray-200 hover:border-purple-400 hover:bg-purple-50"
                }`}
              >

                {/* Letter Badge */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                  ${
                    selected
                      ? "bg-white text-purple-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {optionLetters[index]}
                </div>

                <span className="text-left">{opt.replace(/\["|"\]/g, "")}</span>

              </button>
            );
          })}

        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">

          <button
            onClick={prev}
            disabled={currentIndex === 0 || submiting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>


          { currentIndex===quizz?.questions.length-1 ?(
              <button
            onClick={handlesubmitQuizz}
            disabled={submiting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 shadow-md disabled:opacity-40"
          >
           <span className="flex gap-2">
            {
              submiting ?
              (<>
              <div className=""/>
              submiting...
              </>)
              :
             ( <>
           <CheckCircle2  className="" strokeWidth={2.5}/>
              submite
              </>)
            }

           </span>
          </button>
          ):(  <button
            onClick={next}
            disabled={currentIndex === quizz?.questions.length - 1}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 shadow-md disabled:opacity-40"
          >
            Next
            <ChevronRight size={18} />
          </button>) }

        

        </div>
      </div>
    </div>
  );
};

export default QuizzerTakePage;