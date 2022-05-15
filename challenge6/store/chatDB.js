const Contenedor = require('./contenedor')

function getAllMessages() {
  const messagesDB = new Contenedor('messages')
  return messagesDB.getAll()
}

function addMessage({ email, date, message }) {
  const messagesDB = new Contenedor('messages')
  const newMessage = { email, date, message }
  return messagesDB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
}
