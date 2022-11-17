const mapError = {
    PRODUCT_NOT_FOUND: 404,
}

const errorMap = (type) => mapError[type] || 500;

module.exports ={
    mapError,
    errorMap,
}