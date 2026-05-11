

import { Trophy, ArrowLeft, CheckCircle, XCircle, ListChecks, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { detailedResult } from "../../services/quizeService";
import { Link, useParams } from "react-router-dom";

const QuizzerResultPage = () => {
   const {quizId}=useParams();
   const [results ,setResult]=useState(null);
   const [loading ,setLoading]=useState(false);
   const fetchQuizzResultData=async()=>{
    setLoading(true);
    try { 
      const result = await detailedResult(quizId);
       setResult(result);
    } catch (error) {
      console.log(error.message||"failed to fetched result");
    }finally{
      setLoading(false);
    }
   }
   useEffect(()=>{
fetchQuizzResultData();
   },[quizId])
   const totalQuestions = results?.quiz?.totalQuestions;
   const correct = results?.result?.filter((q)=>q.isCurrect).length;
   const incorrect= totalQuestions - correct;

   const percentage = Math.round((correct / totalQuestions) * 100);
  const getPerformance = () => {
    if (percentage >= 80) return { text: "Excellent", color: "text-green-500" };
    if (percentage >= 50) return { text: "Good", color: "text-yellow-500" };
    return { text: "Bad", color: "text-red-500" };
  };

  const performance = getPerformance();

  return (
    <div className="min-h-screen  bg-gray-50 px-4">

      {/* Back Button */}
      <div className="mt-6">
        <Link to={`/documents/${results?.quiz?.documentId._id}`} className="inline-flex px-3 py-2 rounded-lg bg-purple-500  items-center gap-2 mb-6 text-white hover:text-purple-700 mt-4">
        <ArrowLeft size={20} />
        Back to Document
        </Link>
      </div>

        

      {/* Title */}

      <h1 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8  text-gray-800 px-2">
  {results?.quiz?.documentId?.title}
</h1>

      {/* Result Card */}
      <div className=" flex flex-col justify-center items-center">
      <div className="w-full max-w-md  bg-white rounded-2xl shadow-lg p-8 text-center">

        {/* Trophy */}
        <div className="flex justify-center mb-4 text-yellow-500">
          <Trophy size={60} />
        </div>
        
      <h3 className="text-slate-700 mb-3 ">Your Score</h3>
        {/* Score */}
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {percentage}%
        </h2>

        {/* Performance */}
        <p className={`text-lg font-semibold mb-6 ${performance.color}`}>
          {performance.text}
        </p>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm">

          <div className="flex flex-col items-center">
            <ListChecks className="text-blue-500 mb-1" size={22} />
            <span className="font-semibold">{totalQuestions}</span>
            <span className="text-gray-500">Total</span>
          </div>

          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 mb-1" size={22} />
            <span className="font-semibold">{correct}</span>
            <span className="text-gray-500">Correct</span>
          </div>

          <div className="flex flex-col items-center">
            <XCircle className="text-red-500 mb-1" size={22} />
            <span className="font-semibold">{incorrect}</span>
            <span className="text-gray-500">Incorrect</span>
          </div>

        </div>
      </div>
      </div>

     <div className=" min-h-screen  py-10 px-4 ">
      
         <h1 className="text-2xl font-bold text-gray-800 m-5">
          Quiz Review
        </h1>
     
         {
      results?.result?.map((result,index)=>{
        const userAnswerIndex= result.option.findIndex((opt)=> opt===result.Selectedanswer);
        const currectAnswerIndex=result.option.findIndex((opt)=> opt===result.currectAnswers);
       return  <div className=" py-5 px-4 flex justify-center">
      <div className="w-full max-w-4xl ">
            <div
           
              className="bg-white shadow-md border border-purple-100 rounded-2xl p-6"
            >

              {/* Question */}
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {index + 1}. {result.question.replace(/\["|"\]/g, "")}
              </h2>

              {/* Options */}
              <div className="grid gap-3 mb-6">

                {result?.option?.map((opt, i) => {
                   
                  const isCorrect = i === currectAnswerIndex;
                  const isUser = i === userAnswerIndex;

                  let style = "border-gray-200";

                  if (isCorrect) {
                    style = "bg-purple-100 border-purple-500 text-purple-700";
                  }

                  if (isUser && !isCorrect) {
                    style = "bg-red-100 border-red-500 text-red-600";
                  }

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between border p-3 rounded-lg ${style}`}
                    >

                      <span>{opt.replace(/\["|"\]/g, "")}</span>

                      {isCorrect && (
                        <CheckCircle size={18} className="text-purple-600" />
                      )}

                      {isUser && !isCorrect && (
                        <XCircle size={18} className="text-red-500" />
                      )}

                    </div>
                  );
                })}

              </div>

              {/* Explanation */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-purple-700 mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4"  strokeWidth={2.5}/>
                  Explanation
                </p>

                <p className="text-gray-700 text-sm">
                  {result.explanation.replace(/\["|"\]/g, "")}
                </p>
              </div>

            </div>
       
      </div>
    </div>
      })
    }
     </div>
   

   <div className="mt-6 flex justify-center items-center ">
        <Link to={`/documents/${results?.quiz?.documentId._id}`} className="flex items-center gap-2 mb-6 text-white px-5 py-2 rounded-xl bg-purple-400 font-bold ">
        <ArrowLeft size={20} />
        Return to Document
        </Link>
      </div>
      
    </div> 
  );
};

export default QuizzerResultPage;