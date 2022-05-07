const express = require('express')
const FakeProductsDB = require('./store/fakeProductDB')
const PORT = 8080
const productsDB = new FakeProductsDB()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', viewProductList)
app.get('/crearProducto', viewCreateProduct)
app.post('/product', validateProduct, postProduct)
app.listen(PORT, () => console.log(`Open server on port ${PORT}`))

function viewProductList(req, res) {
  const products = productsDB.getAllProducts()
  res.render('productList.pug', { products })
}

function viewCreateProduct(req, res) {
  const { error, title, price, thumbnail } = req.query
  return res.render('productForm.pug', { error, title, price, thumbnail })
}

function postProduct(req, res) {
  const { error } = req
  if (error && error.length > 0) {
    return res.redirect(
      `/crearProducto/?error=${error}&title=${req.title}&price=${req.price}&thumbnail=${req.thumbnail}`
    )
  }
  const { title, price, thumbnail } = req.body
  productsDB.postProduct({ title, price, thumbnail })
  return res.redirect('/')
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
