import React, { useEffect, useState } from "react";
import { deleteQuiz, getAllQuize } from "../../services/quizeService";
import { generateQuizs } from "../../services/aiServices";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Spinner from "../../component/common/spinar";
import EmptySet from "../../component/common/EmptySet";
import QuizDashboard from "./quizCard";
import GenerateQuizModal from "./GenerateQuizModal";

const QuizzsManager = ({ documentId }) => {
  const [quizzes, setquizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setgenerating] = useState(false);

  const [numQuestion, setNumQuestion] = useState(4);
  const [deleted, setDeleted] = useState(null);
   const [deleteModelOpened,isDeleteModelOpened]=useState(false);
   
  const handleFetchQuizzes = async () => {
    setLoading(true);
    try {
      const responce = await getAllQuize(documentId);
      setquizzes(responce.data);
    } catch (error) {
      console.log(error.message || "fialed to fatch document");
    } finally {
      setLoading(false);
    }
  };
  const generatQuizzes = async (numQuestions) => {
    setgenerating(true);
    try {
     await generateQuizs(documentId,numQuestions);
      toast.success("Quizz generated successfully");
      handleFetchQuizzes();
    } catch (error) {
      toast.error("Fialed to Quizz generating");
      console.log(error.message || "fialed to fatch document");
    } finally {
      setgenerating(false);
    }
  };


  const handlequizzDeleteButton=async(id)=>{
    console.log(id)
   setLoading(true)
        try {
        const res= await deleteQuiz(id);
        if(res.status===201){
            handleFetchQuizzes()
            toast.success("quizz  Deleted !")
        }
        } catch (error) {
             console.log(error.message || "Can't delete the FlashCard")
        }finally{
            setLoading(false)
        }
  }

  useEffect(() => {
    handleFetchQuizzes();
  }, [documentId]);

  const renderQuizzContent = () => {
    if (loading) {
      return   <Spinner />;
    }
    if (quizzes.length === 0) {
      return (
        <EmptySet
          name="Quizz"
          title="No Quizzs Yet"
          description=" You haven’t created any quizz yet. Generate your first set to
          start learning and reviewing concepts quickly."
          generatQuizzes={generatQuizzes}
          generating={generating}
        />
      );
    }

    return <div className="  gap-4">
       <QuizDashboard  quizzes={quizzes} onDelete={handlequizzDeleteButton}/>
     
    </div>
  };

  return (
    <div className="w-full  h-full p-6 bg-white border border-neutral-200 rounded-lg ">
      <div className=" flex justify-end gap-2 mb-4">
        <button
          onClick={()=>isDeleteModelOpened(true)}
          disabled={generating}
          className="   flex justify-center py-3 px-4 shadow-md gap-2  bg-emerald-500 hover:bg-emerald-600 text-white font-medium  rounded-xl transition duration-200 shadow-md"
        >
          <Plus />
          {generating ? " Generate Quizz..." : "Generate Quizz"}
        </button>
      </div>
      {renderQuizzContent()}
     
      <div>
        {
          deleteModelOpened && (
            <GenerateQuizModal onCancel={()=>isDeleteModelOpened(false)} onGenerate={generatQuizzes} generating={generating}/>
          )
        }
      </div>
</div>
      
  );
};

export default QuizzsManager;
