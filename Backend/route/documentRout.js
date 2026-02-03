import epxress from "express";
import { upload } from "../config/multer.js";
import { getDocument, getDocuments, uploadPdf } from "../controller/documentController.js";
import { projectAuth } from "../Middleware/auth.js";

const DocumentRout= epxress.Router()


DocumentRout.post("/uploads",projectAuth, upload.single("pdf"),uploadPdf)
DocumentRout.get("/",projectAuth,getDocuments);
DocumentRout.get("/:id",projectAuth,getDocument);

export default DocumentRout;