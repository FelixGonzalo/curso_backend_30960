import Contenedor from './store/contenedor_knex.js'
import {config} from './store/db_sqlite/config.js'
const DB = new Contenedor(config, 'users')

function addUser({ email, password }) {
  return DB.save({ email, password })
}

function getAllUsers() {
  return DB.getAll()
}

export default {
  addUser,
  getAllUsers,
}
