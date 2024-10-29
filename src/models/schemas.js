const mongoose = require('mongoose');
const Joi = require('joi');

const authSchema = new mongoose.Schema({
    name: { type: String,  },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
    email: { type: String, required: true, },
    password: { type: String, required: true },
});

const joiSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    role: Joi.string().min(5).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

authSchema.methods.validate = function (data) {
    return joiSchema.validate(data);
};

module.exports = mongoose.model('Auth', authSchema);
