const { Router } = require('express');
const salesControler = require('../controllers/sales.controller');

const salesRouter = Router();

salesRouter.post('/', salesControler.addSale);

module.exports = salesRouter;