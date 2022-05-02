const productsRouter = require('express').Router()
const { products, initialContID } = require('../../store/fakeProducts')

productsRouter.get('', getAllProducts)
productsRouter.get('/:id', getProductById)
productsRouter.post('', validateProduct, postProduct)
productsRouter.put('/:id', validateProduct, putProduct)
productsRouter.delete('/:id', deleteProducto)

function getAllProducts (req, res) {
  res.json(products)
}

function getProductById (req, res) {
  const { id } = req.params
  const product = products.find(obj => obj.id === parseInt(id))
  if (!product) return res.json({ error: 'producto no encontrado' })
  res.json(product)
}

let contID = initialContID
function postProduct (req, res) {
  contID++
  const { title, price, thumbnail } = req.body
  const newProduct = { id: contID, title, price: Number(price), thumbnail }
  products.push(newProduct)
  res.json(newProduct)
}

function putProduct (req, res) {
  const { id } = req.params
  const index = products.findIndex(product => product.id === parseInt(id))
  if (index < 0) return res.json({ error: 'producto no encontrado para editar' })
  const { title, price, thumbnail } = req.body
  const updateProduct = { id: parseInt(id), title, price, thumbnail }
  products.splice(index, 1, updateProduct)
  res.send(updateProduct)
}

function deleteProducto (req, res) {
  const { id } = req.params
  const index = products.findIndex(product => product.id === parseInt(id))
  if (index < 0) return res.json({ error: 'producto no encontrado para eliminar' })
  products.splice(index, 1)
  res.json(id)
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
