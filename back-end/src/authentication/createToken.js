const jwt = require('jsonwebtoken');

const secret = 'Higor Luciano Isa Bruno';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = createToken;
