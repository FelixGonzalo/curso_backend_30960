import knex from 'knex'
import formatDTO from '../../dto/ProductDto.js'

export default class PersonasDaoSQLite {
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
      throw new Error(error.message)
    }
  }

  async getById(id) {
    try {
      const product = await this.knex(this.tableName).select('*').where('id', id)
      return formatDTO(product) 
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async save(obj) {
    try {
      const productId = await this.knex(this.tableName).insert(obj)
      return productId
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteById(id) {
    try {
      const res = await this.knex.from(this.tableName).where('id', id).del()
      if (res === 0) throw new Error('El producto no existe')
      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateById(id, newObj) {
    try {
      const res = await this.knex.from(this.tableName).where('id', id).update(newObj)
      if (res === 0) throw new Error('El producto no existe')
      return {id, ...newObj}
    } catch (error) {
      throw new Error(error.message)
    }
  }
}