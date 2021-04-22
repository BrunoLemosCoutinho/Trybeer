const { Router } = require('express');
const rescue = require('express-rescue');
const { Users, Sales, Products, SalesProducts } = require('../../models');

const router = new Router();

const OK = 200;

router.post('/', rescue(async (req, res) => {
    const { cart, userEmail, totalPrice, status, rua, numero } = req.body;
    const { id: userId } = await Users.findOne({ where: { email: userEmail } });
    const products = await Products.findAll();
    const newCart = cart.map((product) => {
      const newProduct = products.find((newP) => product.name === newP.name);
      return { id: newProduct.id, quantity: product.quantity };
    });
    const { id: saleId } = await Sales.create({
      userId,
      totalPrice: totalPrice.replace(',', '.'),
      deliveryAddress: rua,
      deliveryNumber: numero,
      status,
    });
    const saleProduct = newCart.map((element) => ({ saleId, ...element }));
    await SalesProducts.create(saleProduct);
    return res.status(OK).json({ message: 'Sales success' });
}));

module.exports = router;
