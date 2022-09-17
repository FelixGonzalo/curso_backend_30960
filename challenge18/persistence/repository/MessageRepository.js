import MessageDaoFactory from '../dao/message/MessageDaoFactory.js'
const messageDaoFactory = new MessageDaoFactory()

export default class MessageRepository {
    constructor() {
        this.dao = messageDaoFactory.getDao()
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