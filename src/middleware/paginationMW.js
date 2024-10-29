const paginationMiddleware = (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    req.pagination = {
        page: Math.max(1, parseInt(page)),
        limit: Math.min(100, parseInt(limit)), // Optional: Limit maximum limit
        skip: (Math.max(1, parseInt(page)) - 1) * Math.min(100, parseInt(limit))
    };
    next();
};
module.exports = paginationMiddleware;
