const connection = require('./connection');

exports.getAll = async () =>
  connection.execute('SELECT * FROM users;').then(([user]) => user);

exports.getByEmail = async (email) => (
  connection
    .execute('SELECT * FROM users WHERE email = ?', [email])
    .then(([[user]]) => user || null)
);

exports.create = async ({ name, email, password, role }) =>
  connection
    .execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
      name,
      email,
      password,
      role,
    ])
    .then(([result]) => ({ id: result.insertId, email, password, role }));

exports.update = async (newName, email) =>
  connection
    .execute('UPDATE users SET name = ? WHERE email = ?', [newName, email])
    .then(([user]) => user || null);
