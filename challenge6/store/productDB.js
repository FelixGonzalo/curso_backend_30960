const Contenedor = require('./contenedor')

function getAllProducts() {
  const productsDB = new Contenedor('products')
  return productsDB.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const productsDB = new Contenedor('products')
  const newProduct = { title, price, thumbnail }
  return productsDB.save(newProduct)
}

module.exports = {
  getAllProducts,
  addProduct,
}
