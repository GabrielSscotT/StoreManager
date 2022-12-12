const productsService = require('../services/products.service');
const { errorMap } = require('../middlewares/mapError');

const showAllProducts = async (_req, res) => {
    const products = await productsService.productList();
    return res.status(200).json(products);
};

const showProductById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.productById(id);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(200).json(message);
};

const addNewProduct = async (req, res) => {
    const { name } = req.body;
    const { type, message } = await productsService.newProduct(name);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await productsService.updateProduct(name, id);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(200).json(message);
};

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.deleteProduct(id);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(204).json();
};

const searchProductByTerm = async (req, res) => {
    const { q } = req.query;
    const { message } = await productsService.searchProduct(q);
    return res.status(200).json(message);
}
module.exports = {
    showAllProducts,
    showProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
    searchProductByTerm,
};