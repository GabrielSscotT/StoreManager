const salesService = require('../services/sales.service');
const { errorMap } = require('../middlewares/mapError');

const addSale = async (req, res) => {
    const list = req.body;

    const { type, message } = await salesService.newSale(list);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(201).json(message);
};

const showAllSales = async (_req, res) => {
    const sales = await salesService.saleList();
    return res.status(200).json(sales);
};

const showSaleByID = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.saleById(id);
    if (type) {
        return res.status(errorMap(type)).json({ message });
    }
    return res.status(200).json(message);
};

module.exports = {
    addSale,
    showAllSales,
    showSaleByID,
};