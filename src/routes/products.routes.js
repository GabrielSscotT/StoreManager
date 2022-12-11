const { Router } = require('express');
const productsControler = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/search', productsControler.searchProductByTerm);
productsRouter.get('/', productsControler.showAllProducts);
productsRouter.get('/:id', productsControler.showProductById);
productsRouter.post('/', productsControler.addNewProduct);
productsRouter.put('/:id', productsControler.updateProductById);
productsRouter.delete('/:id', productsControler.deleteProductById);


module.exports = productsRouter;