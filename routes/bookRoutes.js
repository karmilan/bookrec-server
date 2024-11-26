import express from "express";
import { BookCreate, BookDelete, BookDetail, BookIndex, BookUpdate } from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// R - For Reading
router.get("/books", verifyToken, BookIndex);

router.get("/books/:id", verifyToken, BookDetail);

// C - For creating movies
router.post("/books", verifyToken, upload.single('image'), BookCreate);

// U - For updating movie
router.put("/books/:id", verifyToken, BookUpdate);

//  D - For deleting movie
router.delete("/books/:id", verifyToken, BookDelete);

export default router;