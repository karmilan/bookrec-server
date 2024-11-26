import path from 'path';
import Book from '../models/bookModel.js';

// get all books
export const BookIndex = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// create new book 
export const BookCreate = async (req, res) => {
    console.log("req>>", req.user.id);
    const imagePath = req.file ? path.join('/uploads', req.file.filename) : null;
    const imagePath2 = req.file.path.replace(/\\/g, "/");

    if (!imagePath) {
        return res.status(400).json({ message: 'Image upload failed' });
    }

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        addedBy: req.user.id,
        image: imagePath2

    });

    try {
        const book = await newBook.save();
        return res.status(201).json({ book, imgUrl: `http://localhost:5000/${book.image}` });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// get a book detail 
export const BookDetail = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book == null) {
            return res.status(404).json({ message: "Cannot find book" });
        } else {
            res.json(book);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// uodate book 
export const BookUpdate = async (req, res) => {
    console.log("req>>", req.body);

    try {
        const updatedBook = await Book.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                description: req.body.description,
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// delete book 
export const BookDelete = async (req, res) => {
    const bookId = req.params.id;

    try {
        await Book.deleteOne({ _id: bookId });
        res.json({ message: "Book deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};