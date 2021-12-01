const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const Messages = require('./databases/mongodb/models/Messages');
const LoginController = require('./src/controller/LoginControler');
const UsersController = require('./src/controller/UsersController');
const ProductsController = require('./src/controller/ProductsController');
const ProfileController = require('./src/controller/ProfileController');
const SalesController = require('./src/controller/salesController');
const CheckoutController = require('./src/controller/CheckoutController');
const ClientOrdersController = require('./src/controller/ClientOrdersController');
const MessagesController = require('./src/controller/MessagesController');

const PORT = 3001;

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('connectRoom', (roomName) => {
    socket.join(roomName);
  });

  socket.on('chat.historyRequest', async (nickname) => {
    const historyMessages = await Messages.getByUser(nickname);
    console.log('User historyMessages', historyMessages);
    socket.emit('chat.historyUpdate', historyMessages);
  });

  socket.on('chat.sendMessage', async (data) => {
    console.log('Data que chega no back', data);
    const sentAt = moment().format('HH:mm');
    const newData = { ...data, sentAt };
    console.log('Newdata.chatRoom', newData.chatRoom);
    await Messages.create(newData);
    io.to(newData.chatRoom || newData.nickname)
      .emit('chat.receiveMessage', newData);
  });
});

app.use('/login', LoginController);

app.use('/register', UsersController);
app.use('/products', ProductsController);
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/profile', ProfileController);
app.use('/admin/orders', SalesController);
app.use('/checkout', CheckoutController);
app.use('/orders', ClientOrdersController);
app.use('/messages', MessagesController);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json(err.message);
});

httpServer.listen(PORT, console.log(`Experando Requisições na porta ${PORT}`));
