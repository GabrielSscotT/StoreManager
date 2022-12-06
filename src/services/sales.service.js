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
  
  const result = await salesModel.insertSale(list);  
  return { type: null, message: { id: result, itemsSold: [...list] } };
  };

  const saleList = async () => {
    const sales = await salesModel.getSales();
    return sales;
  };

  const saleById = async (id) => {
    const sale = await salesModel.getSalesById(id);
    if (!sale.length > 0) {
        return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
    }
  
    return { type: null, message: sale };
  };

  const deleteSale = async (saleId) => {
    const sale = await salesModel.getSalesById(saleId);
    if (!sale.length > 0) {
      return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
    }
    await salesModel.deleteSale(saleId);
    return { type: null };
  };

  const updateSale = async (id, list) => {
    const error = validateSale(list);
    if (error.type) {
      return error;
    }

    const notFound = await isExistingProduct(list);
    if (notFound) { 
        return notFound; 
    }

    const sale = await salesModel.getSalesById(id);
    if (!sale.length > 0) {
      return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
    }

    const result = await Promise.all(
      list.map((sale)=> salesModel.updateSale(id, sale))
    );
    
    console.log(result)
    return { type: null, message: { saleId: id, itemsUpdated: [...list] } };
  }


module.exports = {
    newSale,
    saleList,
    saleById,
    deleteSale,
    updateSale,
};