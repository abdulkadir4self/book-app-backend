const express = require('express');
const app = express();
const mongoose = require('mongoose');
const portNo = 5002;
const dotenv = require('dotenv').config();
const authSchema = require('./src/models/schemas')
const Book = require('./src/models/bookschema');
const authMiddleware = require('./src/middleware/AuthMiddleware');

// note : // pagination is only added on category route. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(`${process.env.MONGODB_LINK}abkadar-book-mngmt`)
    .then(() => {
        console.log('db connected successfully');
    })
    .catch(() => {
        console.log('db could not connect');
    })


let filteredResult = (author, genres, year) => {
    let filter = {};

    if (author) {
        filter.author = author; // No return here
    }

    if (genres) {
        const genreArray = genres.split(',');
        filter.categories = { $in: genreArray }; // No return here
    }

    if (year) {
        const yearArray = year.split(',');
        filter.year = { $in: yearArray }; // No return here
    }

    return filter; // Return the filter object at the end
}


//auth routes
const authRoutes = require('./src/routes/AuthRoutes');
app.use('/auth', authRoutes)


//book routes
const bookRoutes = require('./src/routes/BookRoutes');
const paginationMiddleware = require('./src/middleware/paginationMW');
app.use('/book', bookRoutes);


// pagination is only added on this route. 
app.get('/category', authMiddleware, paginationMiddleware, async (req, res) => {
    const { genres } = req.query;
    const { skip, limit, page } = req.pagination;

    try {
        let filter = {};

        if (genres) {
            const genreArray = genres.split(',');
            filter.categories = { $in: genreArray };
        }

        const books = await Book.find(filter).skip(skip).limit(limit);
        const numberOfBooksInCategories = await Book.countDocuments(filter);
        const totalPages = Math.ceil(numberOfBooksInCategories / limit);

        res.json({
            message: `${genres ? genres : 'All'}: ${numberOfBooksInCategories}`,
            data: books,
            pagination: {
                currentPage: page,
                totalPages,
                totalBooks: numberOfBooksInCategories,
                limit,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//   by applying all filter and sort - year in ascending order
app.get('/get-books-by-all-filter', authMiddleware, async (req, res) => {
    const { author, genres, year, title } = req.query;

    try {
        const filter = filteredResult(author, genres, year,)
        const books = await Book.find(filter).sort({ year: 1 });
        res.json(books);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//   by applying all filter and sort - title ascending order
app.get('/get-books-by-title', authMiddleware, async (req, res) => {
    const { author, genres, year, title } = req.query;
    try {
        const filter = filteredResult(author, genres, year,)
        const books = await Book.find(filter).sort({ title: 1 });
        res.json(books);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//   by applying all filter and sort - title descending order
app.get('/get-books-by-title-descending', authMiddleware, async (req, res) => {
    const { author, genres, year, title } = req.query;
    try {
        const filter = filteredResult(author, genres, year,)
        const books = await Book.find(filter).sort({ title: -1 });
        res.json(books);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//   by applying all filter and sort - year descending order
app.get('/get-books-descending', authMiddleware, async (req, res) => {
    const { author, genres, year } = req.query;

    try {
        const filter = filteredResult(author, genres, year,)
        const books = await Book.find(filter).sort({ year: -1 });
        res.json(books);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// filter by year or author
app.get('/year-author', authMiddleware, async (req, res) => {
    const { author, year } = req.query;
    try {
        const filter = filteredResult(year, author)
        const books = await Book.find(filter)
        res.json({ data: books });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

app.listen(portNo, () => {
    console.log(`port is running on ${portNo}`);
})