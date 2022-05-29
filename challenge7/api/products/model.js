const Contenedor = require('../../store/contenedor_knex')
const { config } = require('../../store/db_mysql/config')
const DB = new Contenedor(config, 'products')

function getAllProducts() {
  return DB.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }
  return DB.save(newProduct)
}

module.exports = {
  getAllProducts,
  addProduct,
}
