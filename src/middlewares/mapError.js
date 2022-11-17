const mapError = {
    PRODUCT_NOT_FOUND: 404,
    FIELD_REQUIRED: 400,
    INVALID_FIELD: 422,
};

const errorMap = (type) => mapError[type] || 500;

module.exports = {
    mapError,
    errorMap,
};