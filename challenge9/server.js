require('dotenv').config()
const express = require('express')
const productsRouter = require('./api/products/controller')
const chatRouter = require('./api/chat/controller')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productsDB = require('./api/products/model')
const chatDB = require('./api/chat/model')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'pug')
app.use('/api/products', productsRouter)
app.use('/api/chat', chatRouter)
app.get('/', viewProductPage)
app.get('/test/products', viewProductTestPage)

io.on('connection', main)
httpServer.listen(PORT, () => console.log(`Open server on port ${PORT}`))

const keys = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  CHAT_MESSAGES: 'CHAT_MESSAGES',
  CHAT_ADD_MESSAGE: 'CHAT_ADD_MESSAGE',
}

async function main(socket) {
  console.log('A client has connected')
  try {
    const messages = await chatDB.getAllMessages()
    const products = await productsDB.getAllProducts()
    socket.emit(keys.PRODUCTS, products)
    socket.emit(keys.CHAT_MESSAGES, messages)
    socket.on(keys.ADD_PRODUCT, sendProducts)
    socket.on(keys.CHAT_ADD_MESSAGE, sendMessages)
  } catch (error) {
    console.error(error)
  }
}

function viewProductPage(req, res) {
  res.render('productPage.pug')
}

function viewProductTestPage(req, res) {
  res.render('productTestPage.pug')
}

function sendProducts() {
  productsDB.getAllProducts().then((data) => {
    io.sockets.emit(keys.PRODUCTS, data)
  })
}

function sendMessages() {
  chatDB.getAllMessages().then((data) => {
    io.sockets.emit(keys.CHAT_MESSAGES, data)
  })
}
