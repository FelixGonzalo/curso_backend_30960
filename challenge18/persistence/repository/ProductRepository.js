const ProductDaoFactory = require('../dao/product/ProductDaoFactory')
const productDaoFactory = new ProductDaoFactory()

module.exports = class ProductRepository {
    constructor() {
        this.dao = productDaoFactory.getDao()
    }

    async getAll() {
      return this.dao.getAll()
    }

    async getById(id) {
      return this.dao.getById(id)
    }

    async save(obj) {
      return this.dao.save(obj)
    } 

    async deleteById(id) {
      return this.dao.deleteById(id)
    }
}