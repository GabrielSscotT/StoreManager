const { validateProduct } = require('../middlewares/validateProduct');
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

const updateProduct = async (productName, productId) => {
    const error = await validateProduct(productName);
    if (error.type) {
        return error;
    }
    await productsModel.update(productName, productId);
    const product = await productsModel.findById(productId);
    if (!product) {
        return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
    return { type: null, message: product };
};

const deleteProduct = async (productId) => {
    const product = await productsModel.findById(productId);
    if (!product) {
        return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
    await productsModel.deleteProduct(productId);
    return { type: null };
};

const searchProduct = async (term) => {
    const result = await productsModel.search(term);
    return { type: null, message: result };
};

module.exports = {
    productList,
    productById,
    newProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};