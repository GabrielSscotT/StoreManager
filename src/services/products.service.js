const productsModel = require('../models/products.model');

const productList = async () => {
    const allProducts = await productsModel.findAll()
    return allProducts;
}

const productById = async (productId) => {
    const product = await productsModel.findById(productId);
    if (!product) {
        return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
    }
    return { type: null, message: product };
}
module.exports ={
    productList,
    productById,
}