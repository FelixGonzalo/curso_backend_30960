const Contenedor = require('./contenedor')
const messagesDB = new Contenedor('messages')

function getAllMessages() {
  return messagesDB.getAll()
}

function addMessage({ email, date, message }) {
  const newMessage = { email, date, message }
  return messagesDB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
}
