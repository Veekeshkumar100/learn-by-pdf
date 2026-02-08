import { FlashCard } from "../model/flaseCard";
import { Quizz } from "../model/qizzs";


const getDaskBord=async(req,res,next)=>{
    try {
     const userId =req.user.id;
       const totalDocument= await Document.countDocuments({userId});  
       const totalQuiz= await Quizz.countDocuments({userId}) ;
       const totolFlashCard= await FlashCard.countDocuments({userId});
       const completedQuizs = await Quizz.countDocuments({userId,completedAt:{$ne:null}});
     
       const flaseCardSet= await FlashCard.find({userId});
       const totalFlashcard=0;
       const reviewedFlashcard =0;
       const starredFlashCard=0;
       
       flaseCardSet.forEach((set)=>{
         totalFlashcard=set?.cards.length;
         reviewedFlashcard=set?.cards.filter(c=>c.reviewCount>0);
         starredFlashCard=set?.cards.filter(c=>c.isStarred>0);

       })
       const quizset= await Quizz.find({userId,completedAt:{$ne:null}});
       const averageScore= quizset.length>0 ? Math.round(quizset.reduce((sum,c)=> sum+c.quizset.score,0)/quizset.length):0;

       const recentQuiz = await Quizz.find({userId})
       .sort({createdAt:-1})
       .limit(5)
       .populate("documentId","title")
       .select("title score totalQuestions completedAt");

       const recentDocument= await Document.find({userId})
       .sort({lastAccessed:-1})
       .limit(5)
       .populate("documentId","title")
       .select("title fileName lastAccessed status");



       const studyStack = Math.floor(Math.random()*7)+1; //mock data

       res.status(200).json({
        succes:true,
        overview:{
            totalDocument,
            totalFlashcard,
            totalQuiz,
            completedQuizs,
           totalFlashcard,
         reviewedFlashcard ,
          starredFlashCard,
          averageScore,
        studyStack
        },
        recentActivity:{
            documents:recentQuiz,
            Quizzs:recentDocument,
        }
       })
       

       
         








    } catch (error) {
        
    }
}