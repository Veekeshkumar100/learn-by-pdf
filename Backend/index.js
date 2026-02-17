import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import errorHandler from "./Middleware/errorHandler.js";
import connectdb from "./config/db.js";
import router from "./route/authRout.js";
import DocumentRout from "./route/documentRout.js";
import FlashCardRouts from "./route/flashRout.js";
import AiRout from "./route/aiRout.js";
import QuizRout from "./route/quizRout.js";
import DAskBordRout from "./route/daskbordRout.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);
app.use("/api/v1/documets", DocumentRout);
app.use("/api/v1/users", router);
app.use("/api/v1/flashcard", FlashCardRouts);
app.use("/api/v1/ai", AiRout);
app.use("/api/v1/quizz", QuizRout);
app.use("/api/v1/dashbord", DAskBordRout);
//404 handler
app.use((req, res, next) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found", statusCode: 404 });
});

//connect db
//routes

connectdb();

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
