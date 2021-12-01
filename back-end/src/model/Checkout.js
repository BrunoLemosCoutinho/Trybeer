const connection = require('./connection');

exports.create = async ({ userId, totalPrice, rua, numero, status }) =>
  connection
    .execute(
      `INSERT INTO sales
      (user_id, total_price, delivery_address, delivery_number, sale_date, status)
      VALUES (?, ?, ?, ?, SYSDATE(), ?)`,
      [
        userId,
        Number(totalPrice),
        rua,
        numero,
        status,
      ],
    )
    .then(([result]) => ({ id: result.insertId }));

exports.createSaleProduct = async (products) => {
  await products.forEach((product) => connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [product.saleId, product.id, product.quantity],
  ).then((result) => result));
};
