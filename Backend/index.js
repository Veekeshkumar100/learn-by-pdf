
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
import {fileURLToPath} from 'url';
import path from 'path';
 import cors from 'cors';
import errorHandler from './Middleware/errorHandler.js';
import connectdb from './config/db.js';
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorHandler);
//404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Route not found', statusCode: 404 });
});

//connect db
//routes

connectdb();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    // Close server & exit process
    app.close(() => process.exit(1));
});