const fakeProducts = require('./fakeProducts')

module.exports = class FakeProductsDB {
  constructor () {
    this.contID = fakeProducts.length
    this.products = fakeProducts
  }

  getAllProducts () {
    return this.products
  }

  getProductById (id) {
    return this.products.find(obj => obj.id === parseInt(id))
  }

  postProduct ({ title, price, thumbnail }) {
    this.contID++
    const newProduct = { id: this.contID, title, price: Number(price), thumbnail }
    this.products.push(newProduct)
    return newProduct
  }

  putProduct ({ id, title, price, thumbnail }) {
    const index = this.products.findIndex(product => product.id === parseInt(id))
    if (index < 0) return null
    const updateProduct = { id: parseInt(id), title, price, thumbnail }
    this.products.splice(index, 1, updateProduct)
    return updateProduct
  }

  deleteProducto (id) {
    const index = this.products.findIndex(product => product.id === parseInt(id))
    if (index < 0) return null
    this.products.splice(index, 1)
    return id
  }
}
