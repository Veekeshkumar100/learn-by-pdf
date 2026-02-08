import * as geminiService from "../utility/geminiServer.js";

import { Document } from "../model/document.js";
import { FlashCard } from "../model/flaseCard.js";
import { Quizz } from "../model/qizzs.js";
import { findRelevantChunks } from "../utility/testChunker.js";
import { ChatHistory } from "../model/chatHistary.js";
export const generateFlashCard = async (req, res, next) => {
  try {
    console.log(req.body);
    const { documentId, count = 10 } = req.body;
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
    });

    if (!document) {
      return res.status(401).json({
        success: true,
        message: "document is not found",
        status: 401,
      });
    }

    const cards = await geminiService.generateFlashCardfromAi(
      document.extreactedText,
      parseInt(count),
    );
    console.log("cards in ai C", cards);

    const FlashCardset = await FlashCard.create({
      userId: req.user.id,
      documentId: document._id,
      cards: cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty,
        reviewCount: 0,
        isStarred: false,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Flashcard set is generated successfully",
      data: FlashCardset,
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

//generate flashCArdQui from the document

export const generateQuiz = async (req, res, next) => {
  try {
    console.log(req.body);
    const { documentId, count = 10 } = req.body;
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
    });

    if (!document) {
      return res.status(401).json({
        success: true,
        message: "document is not found",
        status: 401,
      });
    }
    const quizeMcq = await geminiService.generateQuiz(
      document.extreactedText,
      parseInt(count),
    );
    console.log("quize",quizeMcq);

    const quizSet = await Quizz.create({
      userId: req.user.id,
      documentId: document._id,
      title: document.title,
      questions: quizeMcq.map((c)=>({
        questionText:c.question,
        options:c.option.map(o=>o),
        correctAnswer:c.currectanswer,
        explanation:c.explanation,
        difficulty:c.difficulty,

      })),
      userAnswers: [],
      totalQuestions: quizeMcq.length,
      score: 0,
    });
    if (!quizSet) {
      res.status(404).json({
        success: false,
        message: "quizset is not set",
        status: 404,
      });
    }
    res.status(201).json({
      success: true,
      message: "quizset is generated successfully",
      data: quizSet,
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

//generate document summary

export const generatDocunetSummary = async (req, res, next) => {
  try {
    console.log(req.body);
    const { documentId } = req.body;
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
    });

    if (!document) {
      return res.status(401).json({
        success: false,
        message: "document is not found",
        status: 401,
      });
    }
    const documentSummarry = await geminiService.generatText(
      document.extreactedText,
    );

    if (!documentSummarry) {
      return res.status(401).json({
        success: false,
        message: "sever not give responce properly",
        status: 401,
      });
    }
    res.status(201).json({
      success: true,
      message: " set is generated successfully",
      data: {
        documentId: document._id,
        title: document.title,
        documentSummarry,
      },
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

//generate document chat

export const Chating = async (req, res, next) => {
  try {
    const { question, documentId } = req.body;
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
      userId: req.user.id,
      status: "ready",
    });

    if (!document) {
      return res.status(401).json({
        success: false,
        message: "document is not found",
        status: 401,
      });
    }

    //find the relevent chunk
    const relevantChunk = findRelevantChunks(document.chunk, question, 4);
    const indexecs = relevantChunk.map((c) => c.chunkIndex);

    //get or cerate chat history
    let chatHistory = await ChatHistory.findOne({
      userId: req.user.id,
      documentId:documentId,
    });
    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        userId: req.user.id,
        documentId: documentId,
        message: [],
      });
    }

    const chatAnwer = await geminiService.chatwithcontext(
      question,
      relevantChunk,
    );

    if (!chatAnwer) {
      return res.status(401).json({
        success: false,
        message: "sever not give responce properly",
        status: 401,
      });
    }

     chatHistory.message.push(
      {
        role: "user",
        content: question,
        timeStamp: new Date(),
        relevantChunk: [],
      },
      {
        role: "user",
        content: chatAnwer,
        timeStamp: new Date(),
        relevantChunk: indexecs,
      },
    );
    await chatHistory.save();

    res.status(200).json({
     success:true,
     data:{
        question,
        chatAnwer,
        relevantChunkIndex:indexecs,
        ChatHistoryID:chatHistory.id,
     },
     message:"chat history created successfully"
    });
  } catch (error) {
    console.log(error);
  }
};

//explain the concept from the document
export const explainContext=async(req,res,next)=>{
    try {
        const { documentId,concept } = req.body;
    if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
    });

    if (!document) {
      return res.status(401).json({
        success: false,
        message: "document is not found",
        status: 401,
      });
    }
     const relevantChunk = findRelevantChunks(document.chunk, concept, 4);
    const context = relevantChunk.map((c) => c.content).join("\n\n");
   console.log("context",context);
    const explaination = await geminiService.explainConcept(
      concept,
      context
    );
    if (!explaination) {
      return res.status(401).json({
        success: false,
        message: "sever not give responce explaination properly",
        status: 401,
      });
    }
    res.status(201).json({
      success: true,
      message: " explaination is generated successfully",
      data: {
        concept,
        explaination,
        relevantChunkIndex:relevantChunk.map((c) => c.chunkIndex),
      },
      status: 201,
    });
    } catch (error) {
        console.error("error while generating explaination",error);
    }
}

export const getChatHistory=async(req,res,next)=>{
    try{
      const {documentId}=req.body;
      console.log(documentId);
     if (!documentId) {
      return res.status(401).json({
        success: true,
        message: "document id is not provided",
        status: 401,
      });
    }
      const chatHistary= await ChatHistory.findOne({
        // userId:res.user.id,
        documentId:documentId,
      }).select('message'); //ony retreiwing the message array
     
      if(!chatHistary){
        return res.status(401).json({
        success: true,
        data:[],
        message: "chatHistory  is not exist",
        status: 401, 
      })

    }
    res.status(200).json({
     success:true,
     messagedata:chatHistary.message,
     message:"chathistory find successfully",
    });

    }catch(error){
     console.log("error while getting chat history",error)
    }
}