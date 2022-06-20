// const Contenedor = require('../../store/contenedor_knex')
// const { config } = require('../../store/db_sqlite/config')
// const DB = new Contenedor(config, 'messages')
const FirebaseContainer = require('../../store/firebase/FirebaseContainer')
const DB = new FirebaseContainer('messages')
const { normalize, denormalize, schema } = require('normalizr')

function getAllMessages() {
  return DB.getAll()
}

function addMessage({ email, message }) {
  const newMessage = { email, message }
  return DB.save(newMessage)
}

async function getAllMessagesNormalized() {
  try {
    const authorSchema = new schema.Entity('authors')
    const messageSchema = new schema.Entity('messages', {
      author: authorSchema,
    })
    const chat = new schema.Entity('chat', {
      messages: [messageSchema],
    })
    const messages = await DB.getAll()
    const data = { id: 'general', messages }
    const dataNormalized = await normalize(data, chat)
    return dataNormalized
  } catch (error) {
    throw new Error(error)
  }
}

function addMessageWithAuthor({
  email,
  name,
  lastName,
  age,
  nick,
  avatar,
  text,
}) {
  const newMessage = {
    author: { id: email, name, lastName, age, nick, avatar },
    text,
    date: Date.now(),
  }
  return DB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
  addMessageWithAuthor,
  getAllMessagesNormalized,
}
