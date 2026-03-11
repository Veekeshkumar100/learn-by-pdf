
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { getQuize } from "../../services/quizeService";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const QuizzerTakePage = () => {
//   const questions = [
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
  const [submiting,setSubmting]=useState(false);
  const [questions,setQuestion]=useState(null);
    
 

   useEffect(()=>{
     const fetchQuizzData = async () => {
    console.log("veeeks")
      setLoading(true);
      try {
       const quizz= await getQuize(quizId);
         setQuizz(quizz.data)
         setQuestion(quizz.data.questions);
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

  console.log(quizz);
  console.log(questions);
  // const question = quizz.questions[currentIndex];
  // const progress = ((currentIndex + 1) / questions.length) * 100;

  const  optionLetters = ["A", "B", "C", "D"];
  const answeredCount = Object.keys(answers).length;

  const selectOption = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
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
  const handlesubmitQuizz=()=>{

  }

  return (
    <div className="min-h-screen w-full   py-12 px-4">
      
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{quizz.title}</h1>
         {/* Title */}
        <div className="w-[90%] mt-6 flex justify-between">

          <p className="text-sm text-gray-500 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Answered {answeredCount}/{questions.length}
          </div>
        
        </div>

       
   {/* Progress */}
        <div className="w-[90%] h-3 bg-gray-200 rounded-full overflow-hidden mb-10 mt-2">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
   
       
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 border border-emerald-100">
         <div className="text-sm px-2 py-1 mb-4 text-emerald-700 rounded-lg gap-2 inline-flex  items-center  bg-emerald-100 border-2 border-emerald-400 ">
          <div className=" border-3 bg-emerald-700 rounded-full"/>
         <p>Question</p>
        {currentIndex + 1} 
       </div>
              {/* Question */}
         <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
            {question.questionText}
          </h2>
        </div>

        {/* Options */}
        <div className="grid gap-4 mb-10">

          {question.options.map((opt, index) => {

            const selected = answers[currentIndex] === opt;

            return (
              <button
                key={index}
                onClick={() => selectOption(opt)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                ${
                  selected
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50"
                }`}
              >

                {/* Letter Badge */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                  ${
                    selected
                      ? "bg-white text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {optionLetters[index]}
                </div>

                <span className="text-left">{opt}</span>

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


          { currentIndex===question.length-1 ?(
              <button
            onClick={handlesubmitQuizz}
            disabled={submiting}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-md disabled:opacity-40"
          >
           <span className="">
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
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-md disabled:opacity-40"
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