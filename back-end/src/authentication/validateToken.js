const jwt = require('jsonwebtoken');

const secret = 'Higor Luciano Isa Bruno';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = validateToken;
