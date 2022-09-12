module.exports = class ProductDaoMemory {
  constructor() {
    this.products = []
    this.cont = 0
  }

  init() {
    console.log('product dao in memory -> ready!')
  }

  disconnect() {
    console.log('product dao in memory -> closed!')
  }

  getIndex(id) {
    return this.products.findIndex(persona => persona.id === id)
  }

  getAll() {
    return this.products
  }

  getById(id) {
    return this.products[this.getIndex(id)]
  }

  save(obj) {
    this.products.push({...obj, id: this.cont++})
    return obj
  }

  deleteById(id) {
    const [borrada] = this.products.splice(this.getIndex(id), 1)
    return borrada
  }

  deleteAll() {
    this.products = []
  }

  updateById(id, nuevo) {
    const index = this.getIndex(id)
    const actualizado = { ...this.products[index], ...nuevo }
    this.products.splice(index, 1, actualizado)
    return actualizado
  }
}