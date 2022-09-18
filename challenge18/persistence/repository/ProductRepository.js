import ProductDaoFactory from '../dao/product/ProductDaoFactory.js'
const productDaoFactory = new ProductDaoFactory()

export default class ProductRepository {
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

    async updateById(id, newObj) {
      return this.dao.updateById(id, newObj)
    }
}