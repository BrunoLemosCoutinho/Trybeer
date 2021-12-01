const connection = require('./connection');

async function create(data) {
  const { chatRoom, message, nickname, sentAt } = data;
  const db = await connection();
  const newMessage = await db
    .collection('messages')
    .updateOne(
      { chatRoom: chatRoom || nickname },
      {
        $push: { messages: { message, nickname, sentAt } },
      },
      { upsert: true },
    );
  
  return newMessage;
}

async function getAll() {
  const db = await connection();
  const queryResult = await db
    .collection('messages')
    .find()
    .toArray();
  return queryResult;
}

async function getAllTimeSorted() {
  const db = await connection();
  const queryResult = await db
    .collection('messages')
    .aggregate([
      {
        $sort: { 'messages.sentAt': -1 },
      },
    ])
    .toArray();
  return queryResult;
}

/*
async function getAllTimeSorted() {
  const db = await connection();
  const queryResult = await db
    .collection('messages')
    .find({})
    .project({_id:0})
    .toArray();
  return queryResult;
}
*/

async function getByUser(nickname) {
  const db = await connection();
  const queryResult = await db
    .collection('messages')
    .find({ chatRoom: nickname })
    .toArray();
  return queryResult;
}

async function getByChatRoom(nickname) {
  const db = await connection();
  const queryResult = await db
    .collection('messages')
    .findOne({ chatRoom: nickname });
  
  if (!queryResult) {
    return { chatRoom: '', messages: [] };
  }
  return queryResult;
}

module.exports = {
  create,
  getAll,
  getByUser,
  getAllTimeSorted,
  getByChatRoom,
};
