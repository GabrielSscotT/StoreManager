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

const getSales = async () => {
    const [result] = await connection.execute(
        `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
        FROM StoreManager.sales s
        INNER JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
        ORDER BY s.id, sp.product_id`,
        );
    return result;    
};

const getSalesById = async (id) => {
    const [result] = await connection.execute(
        `SELECT s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales s
        INNER JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
        WHERE s.id = ${id}
        ORDER BY s.id, sp.product_id`,
      );
      return result;
};

const deleteSale = async (saleId) => {
    await connection.execute(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [saleId],
    );
};

module.exports = {
    insertSale,
    insertSaleProducts,
    getSales,
    getSalesById,
    deleteSale,
};