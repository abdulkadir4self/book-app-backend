
const FilterMiddlware =  ( req , res) => {
    const { author, genres, year, } = req.query;

    let filter = {};

    if (author) {
        return  filter.author = author;
    }

    if (genres) {
        const genreArray = genres.split(',');
        return filter.categories = { $in: genreArray };
    } 

    if (year) {
        const yearArray = year.split(',');
        return  filter.year = { $in: yearArray };
    }}