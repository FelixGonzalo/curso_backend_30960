import admin from 'firebase-admin'
import formatDTO from '../../dto/MessageDto.js'

export default class MessageDaoFirebase {
  constructor() {
    this.db = admin.firestore()
    this.query = this.db.collection('messages')
  }

  init() {
    console.log('message dao in Firebase -> ready!')
  }

  async disconnect() {
    try {
      console.log('message dao in Firebase -> closed!')
    } catch (error) {
      console.error(error)
    }
  }

  async getAll() {
    try {
      const res = await this.query.orderBy('date', 'asc').get()
      const data = []
      res.forEach((doc) => data.push({ ...doc.data(), id: doc.id }))
      return formatDTO(data) 
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById(id) {
    try {
      const res = await this.query.doc(id).get()
      const data = res.data()
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  async save(obj) {
    try {
      const res = await this.query.add(obj)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteById(id) {
    try {
      const res = await this.query.doc(id).delete()
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateById(obj) {
    try {
      const res = await this.query.doc(obj.id).update(obj)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

}
