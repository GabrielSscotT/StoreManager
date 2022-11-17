const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(5).required().messages({
        'string.empty': '"name" is required',
        'string.min': '"name" length must be at least 5 characters long',
    }),
});

const validateProduct = (name) => {
    const { error } = schema.validate({ name });
    if (error) {
        return {
            type: error.details[0].type === 'string.min' ? 'INVALID_FIELD' : 'FIELD_REQUIRED',
            message: error.details[0].message,
        };
    }
    return { type: null };
};

module.exports = {
    validateProduct,
};