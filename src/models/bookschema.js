const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true, },
    // categories: [{ type: String, required: true }]
    categories: { type: [String], required: true }
});

const joibookSchema = Joi.object({
    title: Joi.string().min(2).required(),
    author: Joi.string().min(2).required(),
    year: Joi.number().min(4).required(),
    categories: Joi.array().required()
});

bookSchema.methods.validate = function (data) {
    return joibookSchema.validate(data);
};
module.exports = mongoose.model('book', bookSchema);