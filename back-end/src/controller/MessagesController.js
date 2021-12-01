const { Router } = require('express');
const Messages = require('../../databases/mongodb/models/Messages');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.get('/chatList', async (request, response) => {
  try {
    const allMessages = await Messages.getAllTimeSorted();
    return response.status(OK).json(allMessages);
  } catch (error) {
    return response.status(BAD_REQUEST).json({ message: 'No messages found' });
  }
});

router.post('/chatRoom', async (request, response) => {
  try {
    const chatRoom = request.body.nickname;
    const result = await Messages.getByChatRoom(chatRoom);
    return response.status(OK).json(result);
  } catch (error) {
    return response.status(BAD_REQUEST).json({ message: 'No messages found' });
  }
});

module.exports = router;
