const Book = require('../models/bookschema');
const express = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');
const roleMiddleware = require('../middleware/RoleMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'editor']), async (req, res) => {
    try {
        const { error } = new Book().validate(req.body);
        if (error) {
            console.log(error);
            res.json({
                status: 0,
                message: error.message,
                data: null
            })
        } else { 
        const { title, author, year, categories } = req.body;
        const book = new Book({ title, author, year, categories });
        await book.save();
            res.send({ message: 'Book created successfully', data: book })
        }
    }catch(error){
        console.log(error);
        res.json({
            message: "book could not be created ",
            data: null
        })
    }
});

router.get('/', authMiddleware, roleMiddleware(['admin', 'editor', 'viewer']), async (req, res) => {
    const books = await Book.find();
    res.send({ message:"all books fetched" , data:books});
});

router.get('/:id', authMiddleware, roleMiddleware(['admin', 'editor', 'viewer']), async (req, res) => {
    const books = await Book.findById(req.params.id);
    res.send({ message: "all books fetched", data: books });
});

router.put('/:id', authMiddleware, roleMiddleware(['admin', 'editor']), async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({message:'Book not found'});
    book.title = req.body.title ;
    book.author = req.body.author ;
    book.year = req.body.year ;
    book.categories = req.body.categories;
    await book.save();
    res.send({ message: 'Book updated', data:book });
});

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    console.log(book);
    await Book.findByIdAndDelete(req.params.id);

    res.send({ message: 'Book deleted' , data: book });
});



module.exports = router;
