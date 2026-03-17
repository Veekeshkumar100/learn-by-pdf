import express from "express";
import { deleteFlashCard, getAllFlashCardData, getAllFlashCardSets, getFlashCards, reviewCount, toggleStarredFlshCards } from "../controller/flashCardsController.js";
import { projectAuth } from "../Middleware/auth.js";


const FlashCardRouts=express.Router();

FlashCardRouts.get("/:docunemtId",projectAuth,getFlashCards)
FlashCardRouts.get("/:id/getAllFlashCard",projectAuth,getAllFlashCardSets);
FlashCardRouts.get("/",projectAuth,getAllFlashCardData);
FlashCardRouts.post("/:cardId/reviewed",projectAuth,reviewCount)
FlashCardRouts.post("/:cardId/started",projectAuth,toggleStarredFlshCards)
FlashCardRouts.delete("/:id",projectAuth,deleteFlashCard)


export default FlashCardRouts;