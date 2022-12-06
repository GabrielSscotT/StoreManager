const connection = require('./connection');

const insertSale = async (sales) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO StoreManager.sales (date) VALUE(NOW())',
    );
    
    await Promise.all(sales.map(async (sale) => {
        await connection.execute(
          'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE(?, ?, ?)',
          [insertId, sale.productId, sale.quantity],
        );
    }));
    return insertId;
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

const updateSale = async (saleId, sale) => {
    const { productId, quantity } = sale;

    await connection.execute(
        'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
        [quantity, saleId, productId],
     ); 
    
};

module.exports = {
    insertSale,
    getSales,
    getSalesById,
    deleteSale,
    updateSale,
};