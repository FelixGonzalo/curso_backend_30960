const productsRouter = require('express').Router()
const model = require('./model')

productsRouter.post('/', validateProduct, postProduct)
productsRouter.get('/test', getProductsTest)

function postProduct(req, res) {
  const { error } = req
  if (error && error.length > 0) {
    return res.json({ error })
  }
  const { title, price, thumbnail } = req.body
  model
    .addProduct({ title, price, thumbnail })
    .then((productID) => res.json({ productID }))
    .catch((error) => {
      console.error(error)
      res.json({ error: 'Error en la operación' })
    })
}

function getProductsTest(req, res) {
  const products = model.getProductsTest(5)
  res.json(products)
}

// helpers

function validateProduct(req, res, next) {
  const { title, price, thumbnail } = req.body
  if (!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()) {
    req.error = 'faltan datos del producto'
  } else if (isNaN(price)) {
    req.error = 'El precio debe ser de tipo numérico'
  } else if (!thumbnail.includes('http')) {
    req.error = 'La URL de la foto debe iniciar con http'
  }
  req.title = title
  req.price = price
  req.thumbnail = thumbnail
  next()
}

module.exports = productsRouter
