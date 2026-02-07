import express from "express";
import { deleteFlashCard, getAllFlashCardSets, getFlashCards, reviewCount, toggleStarredFlshCards } from "../controller/flashCardsController.js";
import { projectAuth } from "../Middleware/auth.js";


const FlashCardRouts=express.Router();



FlashCardRouts.get("/",projectAuth,getAllFlashCardSets)
FlashCardRouts.get("/:docunemtId",projectAuth,getFlashCards)
FlashCardRouts.post("/:cardId/reviewed",projectAuth,reviewCount)
FlashCardRouts.post("/:cardId/started",projectAuth,toggleStarredFlshCards)
FlashCardRouts.delete("/:id",projectAuth,deleteFlashCard)


export default FlashCardRouts;