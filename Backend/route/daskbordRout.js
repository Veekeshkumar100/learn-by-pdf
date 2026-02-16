import express from "express"
import { projectAuth } from "../Middleware/auth.js";
import { getDaskBord } from "../controller/daskBordController.js";

export const DAskBordRout = express.Router();

DAskBordRout.get("/getdaskbord",projectAuth,getDaskBord);

export default DAskBordRout;