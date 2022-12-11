const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute('SELECT * FROM products');
    return result;
};

const findById = async (productId) => {
    const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
    return result;
};

const addNew = async (productName) => {
    const [{ insertId }] = await connection.execute('INSERT INTO products(name) VALUE(?)',
    [productName]);
    return insertId;
};

const update = async (productName, productId) => {
    await connection.execute('UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productName, productId]);
    const result = await findById(productId);
    return result;
};

const deleteProduct = async (productId) => {
    await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?;',
        [productId],
      );
};

const search = async (term) => {
    const [result] = await connection.execute(
        `SELECT * FROM StoreManager.products WHERE name like "${term}"`,
        [],
        );
    return result;
}

module.exports = {
    findAll,
    findById,
    addNew,
    update,
    deleteProduct,
    search,
};