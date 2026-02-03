import fs from "fs/promises";
import mongoose from "mongoose";
import { Document } from "../model/document.js";
import { textExchangFromPdf } from "../utility/pdfParser.js";
import { chunkText } from "../utility/testChunker.js";
// import { uploadDir } from "../config/multer.js";


//Helper function for procesing  the pdf

const processPDF = async (documentid, filePath) => {
  try {
    //taking text
    console.log("abl in text",filePath);
    const { text, pageNum } = await textExchangFromPdf(filePath);
    console.log("text of pdf process",text);
    //create ing chunks
    const chunks = await chunkText(text, pageNum);
    console.log(chunks);

    //updating document
    await Document.findByIdAndUpdate(documentid, {
      chunk: chunks,
      status: "ready",
    });

    console.log(`document ${documentid} processed sucesfully`);
  } catch (error) {
    console.log("error while processing pdf", error);
    await Document.findByIdAndUpdate(documentid, {
      status: "failed",
    });
  }
};
export const uploadPdf = async (req, res, next) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(401).json({
        success: false,
        error: "please upload a pdf file",
        statusCode: 401,
      });
    }
    const { title } = req.body;
    if (!title) {
      await fs.unlink(req.file.path);
      return res.status(401).json({
        success: false,
        error: "must upload th title of the pdf",
        statusCode: 401,
      });
    }

    //construct the url for the uploadedb pdf

    // const basrUrl = `http:localhost:${process.env.PORT || 8000}`;
    // const fileUrl = `${basrUrl}/uploads//${req.file.filename}`;
    const filePath = req.file.path;
  

    const document = await Document.create({
      userId: req.user._id,
      title: title,
      fileName: req.file.originalname,
      filePath: filePath, //store the url instetd of the local path
      fileSize: req.file.size,
      status: "processing",
    });

    processPDF(document._id, filePath).catch((err) =>
      console.error("pdf processing error:", err),
    );

    res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      status: 200,
      document,
    });
  } catch (error) {
    next(error);
  }
};



export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "flashCards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcardSets",
        },
      },
      {
        $lookup: {
          from: "quizzs",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzSets",
        },
      },
      {
        $addFields: {
          flashCardCount: { $size: "$flashcardSets" },
          quizzCount: { $size: "$quizzSets" },
        },
      },
      {
        $project: {
          extractText: 0,
          chunks: 0,
          flashCardSets: 0,
          quizzSets: 0,
        },
      },
      {
        $sort: {
          uploadedDate: -1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: documents,
      count: documents.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getDocument = async (req, res, next) => {
  try {
    console.log("did", req.params.id);
    console.log("uid", req.user.id);
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    console.log(document);

    if (!document) {
      return res.status(401).json({
        success: false,
        error: "document is not found",
      });
    }

    //get count of assosiat flashcard and quizzs
    //  const flashCardCount= await FlashCard.countDocument({documentId:document._id,userId:req.user._id});
    //  const quizzCount= await Quiz.countDocument({documentId:document.id,userId:req.user._id});

    document.lastAccessed = Date.now();
    await document.save();

    const documentData = document.toObject();
    documentData.flashCardCount = flashCardCount;
    documentData.quizzCount = quizzCount;

    res.status(200).json({
      successs: true,
      data: documentData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!document) {
      return res.status(401).json({
        success: false,
        error: "document is not found",
      });
    }
    //delete the file from the file system
    await fs.unlink(document.filePath).catch(() => {});

    //delete file from the database
    await docunet.deleteOne();

    res.status(200).json({
      success: true,
      message: "file deleted succesfully",
    });
  } catch (error) {
    console.log("error while deleting file", error);
  }
};
