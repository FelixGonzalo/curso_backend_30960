import MessageDaoFirebase from './MessageDaoFirebase.js'
import MessageDaoMemory from './MessageDaoMemory.js'

import parseArgs from 'minimist'
import argsConfig from '../../../argsConfig.js'
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

export default class MessageDaoFactory {
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
