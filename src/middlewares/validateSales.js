const Joi = require('joi');

const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required().messages({
        'number.empty': '"productId" is required',
    }),
    quantity: Joi.number().required().greater(0).messages({
        'number.greater': '"quantity" must be greater than or equal to 1',
        'number.empty': '"quantity" is required', 
    }),
}));

const validateSale = (sale) => {
    const { error } = schema.validate(sale);
    if (error) {
        return {
            type: error.details[0].type === 'number.greater' ? 'INVALID_FIELD' : 'FIELD_REQUIRED',
            message: error.details[0].message.replace(/\[\d\]./, ''),
        };
    }
    return { type: null, message: '' };
};

module.exports = {
    validateSale,
};