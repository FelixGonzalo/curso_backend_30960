const knex = require('knex')
const formatDTO = require('../../dto/ProductDto')

module.exports = class PersonasDaoSQLite {
  constructor(config) {
    this.knex = knex(config)
    this.tableName = 'products'
  }

  init() {
    console.log('product dao in SQLite -> ready!')
  }

  async disconnect() {
    try {
      await this.knex.destroy()
      console.log('product dao in SQLite -> closed!')
    } catch (error) {
      console.error(error)
    }
  }

  async getAll() {
    try {
      const products = await this.knex(this.tableName).select('*')
      return formatDTO(products) 
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getById(id) {
    try {
      const product = await this.knex(this.tableName).select('*').where('id', id)
      return formatDTO(product) 
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async save(obj) {
    try {
      const productId = await this.knex(this.tableName).insert(obj)
      return productId
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async deleteById(id) {
    try {
      const productId = await this.knex.from(this.tableName).where('id', id).del()
      return productId
    } catch (error) {
      console.error(error)
      return error
    }
  }
}