const { validateSale } = require('../middlewares/validateSales');
const salesModel = require('../models/sales.model');
const productsService = require('./products.service');

const isExistingProduct = async (list) => {
    const productsList = await Promise
      .all(list.map(({ productId }) => productsService.productById(productId)));
  
    const error = productsList.find((elem) => elem.type === 'PRODUCT_NOT_FOUND');
    return error;
   };
  
  const newSale = async (list) => { 
    const error = validateSale(list);
    if (error.type) {
        return error;
    }
  
    const notFound = await isExistingProduct(list);
    if (notFound) { 
        return notFound; 
    }
  
    const saleId = await salesModel.insertSale();
    await Promise.all(list.map(async (sale) => {
      await salesModel.insertSaleProducts({
        saleId,
        productId: sale.productId,
        quantity: sale.quantity,
      });
    }));
  
  return { type: null, message: { id: saleId, itemsSold: list } };
  };

module.exports = {
    newSale,
};