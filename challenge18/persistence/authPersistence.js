const Contenedor = require('./store/contenedor_knex')
const { config } = require('./store/db_sqlite/config')
const DB = new Contenedor(config, 'users')

function addUser({ email, password }) {
  return DB.save({ email, password })
}

function getAllUsers() {
  return DB.getAll()
}

module.exports = {
  addUser,
  getAllUsers,
}
