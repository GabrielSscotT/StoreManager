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

module.exports = {
    findAll,
    findById,
    addNew,
};