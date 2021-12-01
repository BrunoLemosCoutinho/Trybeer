const Orders = require('../model/Orders');

exports.getAll = async (userId) => Orders.getAll(userId);

exports.getDetails = async (orderId) => Orders.getDetails(orderId);

exports.updateStatus = async (id, status) => Orders.update(id, status);
