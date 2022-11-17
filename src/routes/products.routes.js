const { Router } = require('express');
const productsControler = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/', productsControler.showAllProducts);
productsRouter.get('/:id', productsControler.showProductById);
productsRouter.post('/', productsControler.addNewProduct);

module.exports = productsRouter;