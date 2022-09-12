module.exports = class MessageDaoMemory {
  constructor() {
    this.messages = []
    this.cont = 0
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
    this.messages.push({...obj, id: this.cont++})
    return obj
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