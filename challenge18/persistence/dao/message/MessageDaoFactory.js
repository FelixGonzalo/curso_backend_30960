const MessageDaoFirebase = require('./MessageDaoFirebase')
const MessageDaoMemory = require('./MessageDaoMemory')

const parseArgs = require('minimist')
const argsConfig = require('../../../argsConfig')
const { DAO_MESSAGE } = parseArgs(process.argv.slice(2), argsConfig.config)

const option = DAO_MESSAGE

let dao
switch (option) {
  case 'Firebase':
    dao = new MessageDaoFirebase()
    dao.init()
    break
  default:
    dao = new MessageDaoMemory()
    dao.init()
}

module.exports = class MessageDaoFactory {
  static instance

  constructor() {
    if (!MessageDaoFactory.instance) {
      MessageDaoFactory.instance = this;
    } else {
      return MessageDaoFactory.instance;
    }
  }

  getDao() {
    return dao
  }
}
