import express from "express";
import { ReviewCreate, ReviewDetail, ReviewIndex } from "../controllers/reviewController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// R - For Reading
router.get("/reviews", verifyToken, ReviewIndex);

router.get("/reviews/:id", verifyToken, ReviewDetail);

// C - For creating movies
router.post("/reviews", verifyToken, ReviewCreate);

export default router;