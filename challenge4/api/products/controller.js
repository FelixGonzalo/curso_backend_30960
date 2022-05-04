const productsRouter = require('express').Router()
const FakeProductsDB = require('../../store/fakeProductDB')
const productsDB = new FakeProductsDB()

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', validateProduct, postProduct)
productsRouter.put('/:id', validateProduct, putProduct)
productsRouter.delete('/:id', deleteProduct)

function getAllProducts (req, res) {
  res.json(productsDB.getAllProducts())
}

function getProductById (req, res) {
  const { id } = req.params
  const product = productsDB.getProductById(id)
  if (!product) return res.json({ error: 'producto no encontrado' })
  res.json(product)
}

function postProduct (req, res) {
  const { title, price, thumbnail } = req.body
  const newProduct = productsDB.postProduct({ title, price, thumbnail })
  res.json(newProduct)
}

function putProduct (req, res) {
  const { id } = req.params
  const { title, price, thumbnail } = req.body
  const updateProduct = productsDB.putProduct({ id, title, price, thumbnail })
  if (!updateProduct) return res.json({ error: 'producto no encontrado para editar' })
  res.send(updateProduct)
}

function deleteProduct (req, res) {
  const { id } = req.params
  const deletedId = productsDB.deleteProducto(id)
  if (!deletedId) return res.json({ error: 'producto no encontrado para eliminar' })
  res.json({ id })
}

// helpers

function validateProduct (req, res, next) {
  const { title, price, thumbnail } = req.body
  if (!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()) return res.json({ error: 'faltan datos del producto' })
  if (isNaN(price)) return res.json({ error: 'El precio debe ser de tipo numérico' })
  if (!thumbnail.includes('http')) return res.json({ error: 'La URL de la foto debe iniciar con http' })
  next()
}

module.exports = productsRouter
