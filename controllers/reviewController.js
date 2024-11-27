import Book from '../models/bookModel.js';
import Review from '../models/reviewModel.js';

// get all reviews
export const ReviewIndex = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// create new review 
export const ReviewCreate = async (req, res) => {
    console.log("req>>", req.user.id);

    const newReview = new Review({
        userId: req.user.id,
        bookId: req.body.bookId,
        rating: req.body.rating,
        comment: req.body.comment
    });

    try {

        const book = await Book.findById(req.body.bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const review = await newReview.save();
        return res.status(201).json(review);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// get a review detail 
export const ReviewDetail = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (review == null) {
            return res.status(404).json({ message: "Cannot find review" });
        } else {
            res.json(review);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// get review by book 
export const ReviewByBookId = async (req, res) => {
    try {
        const { bookid } = req.params;
        console.log("req.params", req.params);

        const reviews = await Review.find({ bookId: bookid });
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book." });
        }
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



