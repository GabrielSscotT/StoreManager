const { validateProduct } = require('../middlewares/validateproduct');
const productsModel = require('../models/products.model');

const productList = async () => {
    const allProducts = await productsModel.findAll();
    return allProducts;
};

const productById = async (productId) => {
    const product = await productsModel.findById(productId);
    if (!product) {
        return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
    return { type: null, message: product };
};

const newProduct = async (productName) => {
    const error = await validateProduct(productName);
    if (error.type) {
        return error;
    }
    const product = await productsModel.addNew(productName);
    return { type: null, message: { id: product, name: productName } };
};

module.exports = {
    productList,
    productById,
    newProduct,
};