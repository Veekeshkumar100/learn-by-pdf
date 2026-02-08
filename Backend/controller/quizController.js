import { Quizz } from "../model/qizzs.js";

export const getAllQuize = async (req, res, next) => {
  try {
    const  documentId  = req.params.documentId;
    console.log("id",documentId)
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }

    const quizes = await Quizz.find({
      documentId: documentId,
      userId: req.user.id,
    });

    if (!quizes) {
      return res.status(401).json({
        success: false,
        message: "quize   is not found",
        status: 401,
      });
    }

    res.status(200).json({
      success: true,
      message: "quizes found succesfully",
      count: quizes.length,
      data: quizes,
    });
  } catch (error) {
    console.log("error while fetching data from databse", error);
  }
};
//get a single quizes by id
export const getQuize = async (req, res, next) => {
  try {
    const quizes = await Quizz.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!quizes) {
      return res.status(401).json({
        success: false,
        message: "quize   is not found",
        status: 401,
      });
    }

 console.log("qz",quizes)

    res.status(200).json({
      success: true,
      message: "quizes found succesfully",
      data: quizes,
    });
  } catch (error) {
    console.log("error while fetching data from databse", error);
  }
};
export const submitequizesAnswer = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!answers) {
      return res.status(401).json({
        success: false,
        message: "don,t get user answer",
        status: 401,
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(401).json({
        success: false,
        message: "answers must be  type of array",
        status: 401,
      });
    }
      const quizes = await Quizz.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
       
      
       if(quizes.completedAt){
         return res.status(401).json({
        success: false,
        message: "quiz is alreadt completed",
        status: 401,
      });
       }

      let currectCount = 0;
      let userAnswers=[];
       answers.forEach(answer => {
     const { questionIndex, Selectedanswer } = answer;
        console.log(questionIndex, Selectedanswer);
        const question = quizes.questions[questionIndex];  
        console.log("selec",typeof Selectedanswer);
        console.log("question.corr",typeof question.correctAnswer.replace(/[\[\]"]/g, ""));
     

        const isCorrect =  Selectedanswer === question.correctAnswer.replace(/[\[\]"]/g, "");
        console.log("iscirrect",isCorrect);
        if(isCorrect) currectCount++;
        
        userAnswers.push({
            questionIndex:questionIndex,
            selectedOption:Selectedanswer,
            isCorrect:isCorrect,
            answeredAt: new Date(),
        })
      });
      const score = (currectCount / quizes.totalQuestions) *100;
      quizes.userAnswers=userAnswers;
      quizes.score=score;
      quizes.completedAt=new Date();
      
      await quizes.save()

      res.status(201).json({
        success:true,
        data:{
            quizId:quizes._id,
           currectCount,
           score,
           totalQuestions:quizes.totalQuestions,
           percentageScore:score,
           userAnswers,

        },
        message:"answers summited succesfully",
      });
  } catch (error) {
    console.log(error);
  }
};
export const detailtedResult = async(req,res,next)=>{
    try{
        const quizes = await Quizz.findOne({
        _id: req.params.id,
        userId: req.user.id,
      }).populate("documentId","title");

        if (!quizes) {
      return res.status(401).json({
        success: false,
        message: "quize   is not found",
        status: 401,
      });
    }

       if(!quizes.completedAt){
         return res.status(401).json({
        success: false,
        message: "quiz is not completed",
        status: 401,
      });
       }   
       
       
       const ditailedResult =quizes.questions?.map((question,index)=>{
       const userAnswers= quizes.userAnswers.find(a=>a.questionIndex===index);
       return {
        questionIndex:index,
       question:question.question,
       option:question.option,
       currectAnswers:question.correctAnswer,
       explanation:question.explanation,
       selectedAnwer:userAnswers?.selectedOption || null,
       isCurrect:userAnswers?.isCorrect || false,
       }
       })
       

   res.status(201).json({
        success:true,
        quiz:{
            quizId:quizes._id,
            title:quizes.title,
            documentId:quizes.documentId,
            score:quizes.score,
            totalQuestions:quizes.totalQuestions,
            completedAt:quizes.completedAt
        },
        result:ditailedResult,
        message:"answers summited succesfully",
      });



    }catch(error){
    console.log(error);
    }
}

export const deleteQuiz=async(req,res,next)=>{
    try{
        const quizes = await Quizz.findOne({
        _id: req.params.id,
        userId: req.user.id,
      })

        if (!quizes) {
      return res.status(401).json({
        success: false,
        message: "quize   is not found",
        status: 401,
      });
    }

    await quizes.deleteOne();
       res.status(201).json({
        success: false,
        message: "quiz is deleted succesfully",
        status: 201,
      });

    }catch(error){
        console.log(error)
    }
}