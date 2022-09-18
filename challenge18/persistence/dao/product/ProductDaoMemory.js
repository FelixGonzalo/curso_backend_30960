export default class ProductDaoMemory {
  constructor() {
    this.products = []
    this.cont = 1
  }

  init() {
    console.log('product dao in memory -> ready!')
  }

  disconnect() {
    console.log('product dao in memory -> closed!')
  }

  getIndex(id) {
    return this.products.findIndex(product => product.id == id)
  }

  getAll() {
    return this.products
  }

  getById(id) {
    return this.products[this.getIndex(id)]
  }

  save(obj) {
    const newObj = {...obj, id: this.cont++}
    this.products.push(newObj)
    return newObj
  }

  deleteById(id) {
    try {
      const index = this.getIndex(id)
      if (index === -1 ) throw new Error('El producto no existe')
      const [borrada] = this.products.splice(this.getIndex(id), 1)
      return borrada
    } catch (error) {
      throw new Error(error.message)
    }
  }

  deleteAll() {
    this.products = []
  }

  updateById(id, nuevo) {
    try {
      const index = this.getIndex(id)
      if (index === -1 ) throw new Error('El producto no existe')
      const actualizado = { ...this.products[index], ...nuevo }
      this.products.splice(index, 1, actualizado)
      return actualizado
    } catch (error) {
      throw new Error(error.message)
    }
  }
}