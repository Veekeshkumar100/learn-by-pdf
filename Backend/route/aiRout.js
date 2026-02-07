import express from "express"
import { Chating, explainContext, generatDocunetSummary, generateFlashCard, generateQuiz, getChatHistory } from "../controller/aiController.js";
import { projectAuth } from "../Middleware/auth.js";

export const AiRout = express.Router();

AiRout.post("/generate-FlashCard",projectAuth,generateFlashCard);
AiRout.post("/generate-Quiz",projectAuth,generateQuiz);
AiRout.post("/generate-Summary",projectAuth,generatDocunetSummary)
AiRout.post("/generate-Chat",projectAuth,Chating)
AiRout.post("/generate-Explaination",projectAuth,explainContext)
AiRout.post("/generate-getchatHistory",getChatHistory)

export default AiRout;``