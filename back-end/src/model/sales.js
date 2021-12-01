const connection = require('./connection');

exports.getAll = async () => (
  connection.execute('SELECT * FROM sales;').then(([sales]) => sales)
);
