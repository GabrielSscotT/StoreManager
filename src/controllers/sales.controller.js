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

module.exports = {
    addSale,
};