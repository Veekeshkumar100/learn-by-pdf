

//get all flash cards for the document

import mongoose from "mongoose";
import { FlashCard } from "../model/flaseCard.js";

export  const getFlashCards=async(req,res,next)=>{
try {
  
   const FlashCards= await FlashCard.findOne({
    userId:new mongoose.Types.ObjectId(req.user.id),
     documentId:new mongoose.Types.ObjectId(req.params.docunemtId)
    
   }).populate("documentId","title fileName")
   .sort({createdAt:-1});
   
   if(!FlashCards){
    return res.status(404).json({
        success:false,
        error:"flasdCards not found",
        status:404,
    })
   }

 
  res.status(201).json({
        success:true,
        message:"flasdCards  found sussecfully",
        count:FlashCards?.cards?.length ?? 0,
        data:FlashCards,
        status:401,
    });

} catch (error) {
    console.log("error while getting flashCArds ",error);
}
}

export  const getAllFlashCardSets=async(req,res,next)=>{
try {
   const FlashCardSet= await FlashCard.find({
    userId:new mongoose.Types.ObjectId(req.user.id),
   }).populate("documentId","title ")
   .sort({createdAt:-1});

   if(!FlashCardSet){
    res.status(401).json({
        success:false,
        error:"FlashCardSets not found",
        status:401,
    })
   }


  res.status(200).json({
        success:true,
        message:"flasdCards  found sussecfully",
        count:FlashCardSet.length,
        data:FlashCardSet,
        status:401,
    });

} catch (error) {
    console.log("error while getting FlashCardSet ",error);
}
}



export const reviewCount=async(req,res,next)=>{
try {
   const FlashCardSet= await FlashCard.findOne({
     "cards._id":req.params.cardId,
     userId:req.user.id,
   })

   if(!FlashCardSet){
    res.status(401).json({
        success:false,
        error:"FlashCardSet or card not found",
        status:401,
    })
   }

   const cardIndex= FlashCardSet.cards.findIndex(card=>card._id.toString()===req.params.cardId);
     if(cardIndex===-1){
    res.status(401).json({
        success:false,
        error:"card not found in the set",
        status:401,
    })
   }


   FlashCardSet.cards[cardIndex].lastReviewed= new Date();
   FlashCardSet.cards[cardIndex].reviewCount +=1;

  await FlashCardSet.save();

  res.status(200).json({
        success:true,
        message:"flashCards rewieds  sussecfully",
        data:FlashCardSet,
        status:401,
    });

} catch (error) {
    console.log("error while rewiving FlashCardSet ",error);
}
}



export const toggleStarredFlshCards=async(req,res,next)=>{
try {
    // console.log(res.user.id)
   const FlashCardSet= await FlashCard.findOne({
     "cards._id":req.params.cardId,
     userId:req.user.id,
   })
   if(!FlashCardSet){
    res.status(401).json({
        success:false,
        error:"FlashCardSet or card not found",
        status:401,
    })
   }

   const cardIndex= FlashCardSet.cards.findIndex(card=>card._id.toString()===req.params.cardId);
     if(cardIndex===-1){
    res.status(401).json({
        success:false,
        error:"card not found in the set",
        status:401,
    })
   }
   FlashCardSet.cards[cardIndex].isStarred=!FlashCardSet.cards[cardIndex]?.isStarred;
  await FlashCardSet.save();

  res.status(200).json({
        success:true,
        message:`flasdCard ${ FlashCardSet.cards[cardIndex]?"starred":"unstarred"} found sussecfully`,
        data:FlashCardSet,
        status:401,
    });

} catch (error) {
    console.log("error while toglestars FlashCardSet ",error);
}
}


export const deleteFlashCard=async(req,res,next)=>{
    try{
      const flashcard= await FlashCard.findOne({
        _id:req.params.id,
        userId:req.user.id
          })
if(!flashcard){
    res.status(401).json({
        success:false,
        error:"FlashCardSet or card not found",
        status:401,
    })
   }
   await FlashCard.deleteOne()

  res.status(200).json({
        success:true,
        message:`flasdCard deleted sussecfully`,
        status:201,
    });
    }catch(error){
console.log("error while deleting FlashCardSet ",error);
    }
}