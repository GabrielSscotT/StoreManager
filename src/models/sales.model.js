const connection = require('./connection');

const insertSale = async () => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUE(NOW())',
    );
    return insertId;
};

const insertSaleProducts = async ({ saleId, productId, quantity }) => {
    await connection.execute(
       'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE(?, ?, ?)',
       [saleId, productId, quantity],
    );
    return saleId;
};

module.exports = {
    insertSale,
    insertSaleProducts,
}