const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const { Products } = require('../../models');

const router = new Router();

const OK = 200;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', rescue(async (_req, res) => {
  const products = await Products.findAll();

  return res.status(OK).json(products);
}));

router.post('/new', upload.single('image'), rescue(async (req, res) => {
  const { name, price } = req.body;
  const { filename } = req.file;
  const urlImage = `http://localhost:3001/images/${filename}`;

  await Products.create({ name, price, urlImage });

  return res.status(OK).json({ message: 'Produto criado com sucesso' });
}));

module.exports = router;
