const { faker } = require('@faker-js/faker')
const ProductRepository = require('./repository/ProductRepository')
const productRepository = new ProductRepository()

function getAllProducts() {
  return productRepository.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }
  return productRepository.save(newProduct)
}

function getProductsTest(num) {
  const products = []

  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.business(),
    })
  }

  return products
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductsTest,
}
