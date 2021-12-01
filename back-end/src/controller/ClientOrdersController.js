const { Router } = require('express');
const rescue = require('express-rescue');
const { users, sales, products } = require('../../models');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', rescue(async (req, res) => {
  try {
    const user = req.body;

    const { id: userId } = await users.findOne({ where: {
      email: user.email,
    } });

    const orders = await sales.findAll({ where: { userId } });

    return res.status(OK).json(orders);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const dataValues = await sales.findAll(
      {
        where: { id },
        include: [
          {
            model: products,
            as: 'products',
            through: { attributes: ['quantity'] },
          },
        ],
      },
    );

    return res.status(OK).json(dataValues);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

module.exports = router;
