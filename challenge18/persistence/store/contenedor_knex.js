import knex from 'knex'

export default class Contenedor {
  constructor(config, tableName) {
    this.knex = knex(config)
    this.tableName = tableName
  }

  save(obj) {
    return this.knex(this.tableName).insert(obj)
  }

  getById(id) {
    return this.knex(this.tableName).select('*').where('id', id)
  }

  getAll() {
    return this.knex(this.tableName).select('*')
  }

  deleteById(id) {
    return this.knex.from(this.tableName).where('id', id).del()
  }

  close() {
    this.knex.destroy()
  }
}
