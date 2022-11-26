const { Router } = require('express');
const salesControler = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.post('/', salesControler.addSale);
salesRouter.get('/', salesControler.showAllSales);
salesRouter.get('/:id', salesControler.showSaleByID);

module.exports = salesRouter;