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
    // console.log(message)
    return res.status(201).json(message);
};

module.exports = {
    showAllProducts,
    showProductById,
    addNewProduct,
};