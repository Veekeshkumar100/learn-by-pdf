import express from "express"
import { deleteQuiz, detailtedResult, getAllQuize, getQuize, submitequizesAnswer } from "../controller/quizController.js";
import { projectAuth } from "../Middleware/auth.js";

const QuizRout = express.Router();

QuizRout.get("/:documentId",projectAuth,getAllQuize);
QuizRout.get("/quiz/:id",projectAuth,getQuize);
QuizRout.post("/:id/submit",projectAuth,submitequizesAnswer);
QuizRout.post("/:id/result",projectAuth,detailtedResult);
QuizRout.delete("/:id/delete",projectAuth,deleteQuiz);

export default QuizRout;