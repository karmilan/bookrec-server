import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import authRoutes from '../routes/authRoutes.js';
import bookRoutes from '../routes/bookRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';



dotenv.config()
console.log(process.env.MONGO_URI);
connectDB()

const PORT = process.env.PORT || 3000

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", authRoutes)

// CRUD functionality of books
app.use("/api", bookRoutes);

// Serve static files from the uploads folder
app.use('/assets/images', express.static(path.join(__dirname, '../assets/images')));


// CRUD functionality of reviews
app.use("/api", reviewRoutes);


app.listen(PORT, () => console.log(`server started on port ${PORT} in prod`))
