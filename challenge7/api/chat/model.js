const Contenedor = require('../../store/contenedor_knex')
const { config } = require('../../store/db_sqlite/config')
const DB = new Contenedor(config, 'messages')

function getAllMessages() {
  return DB.getAll()
}

function addMessage({ email, message }) {
  const newMessage = { email, message }
  return DB.save(newMessage)
}

module.exports = {
  getAllMessages,
  addMessage,
}
