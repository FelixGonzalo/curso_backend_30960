export default class MessageDaoMemory {
  constructor() {
    this.messages = []
    this.cont = 1
  }

  init() {
    console.log('message dao in memory -> ready!')
  }

  disconnect() {
    console.log('message dao in memory -> closed!')
  }

  getIndex(id) {
    return this.messages.findIndex(persona => persona.id === id)
  }

  getAll() {
    return this.messages
  }

  getById(id) {
    return this.messages[this.getIndex(id)]
  }

  save(obj) {
    const newObj = {...obj, id: this.cont++}
    this.products.push(newObj)
    return newObj
  }

  deleteById(id) {
    const [borrada] = this.messages.splice(this.getIndex(id), 1)
    return borrada
  }

  deleteAll() {
    this.messages = []
  }

  updateById(id, nuevo) {
    const index = this.getIndex(id)
    const actualizado = { ...this.messages[index], ...nuevo }
    this.messages.splice(index, 1, actualizado)
    return actualizado
  }
}