const ProductDaoSQLite = require('./ProductDaoSQLite')
const ProductDaoMemory = require('./ProductDaoMemory')
const { config } = require('../../store/db_sqlite/config')

const parseArgs = require('minimist')
const argsConfig = require('../../../argsConfig')
const { DAO_PRODUCT } = parseArgs(process.argv.slice(2), argsConfig.config)

const option = DAO_PRODUCT

let dao
switch (option) {
  case 'SQLite':
    dao = new ProductDaoSQLite(config)
    dao.init()
    break
  default:
    dao = new ProductDaoMemory()
    dao.init()
}

module.exports = class ProductDaoFactory {
  static instance

  constructor() {
    if (!ProductDaoFactory.instance) {
      ProductDaoFactory.instance = this;
    } else {
      return ProductDaoFactory.instance;
    }
  }

  getDao() {
    return dao
  }
}
