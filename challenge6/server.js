const express = require('express')
const productsRouter = require('./api/products/controller')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const FakeProductsDB = require('./store/fakeProductDB')
const productsDB = new FakeProductsDB()
const chatDB = require('./store/chatDB')

const PORT = 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'pug')
app.use('/', productsRouter)

const keys = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  PRODUCTS_ERROR: 'PRODUCTS_ERROR',
  CHAT_MESSAGES: 'CHAT_MESSAGES',
  CHAT_ADD_MESSAGE: 'CHAT_ADD_MESSAGE',
  CHAT_ERROR: 'CHAT_ERROR',
}

const main = async () => {
  try {
    const messages = await chatDB.getAllMessages()
    console.log(messages)

    io.on('connection', (socket) => {
      console.log('Un cliente se ha conectado')
      socket.emit(keys.PRODUCTS, productsDB.getAllProducts())
      socket.emit(keys.CHAT_MESSAGES, messages)
      socket.on(keys.ADD_PRODUCT, addProduct)
      socket.on(keys.CHAT_ADD_MESSAGE, addMessage)
    })
  } catch (error) {
    console.error(error)
  }
}
main()
httpServer.listen(PORT, () => console.log(`Open server on port ${PORT}`))

// ADD PRODUCT Y ADD MESSAGE

function addProduct(data) {
  const { title, price, thumbnail } = data
  const newProduct = { title, price, thumbnail }

  const error = validateProduct(newProduct)
  if (error) return io.sockets.emit(keys.PRODUCTS_ERROR, error)

  productsDB.postProduct(data)
  io.sockets.emit(keys.PRODUCTS, productsDB.getAllProducts())
  io.sockets.emit(keys.PRODUCTS_ERROR, null)
}

async function addMessage(data) {
  const { email, message } = data
  const newMessage = { email, message, date: Date.now() }
  const error = validateMessage(newMessage)
  if (error) return io.sockets.emit(keys.CHAT_ERROR, error)
  try {
    const id = await chatDB.addMessage(newMessage)
    const messages = await chatDB.getAllMessages()
    console.log(`Message guardado con ID: ${id}`)
    io.sockets.emit(keys.CHAT_MESSAGES, messages)
    io.sockets.emit(keys.CHAT_ERROR, null)
  } catch (error) {
    console.error(error)
  }
}

// VALIDACIONES

function validateProduct(product) {
  const { title, price, thumbnail } = product
  let error = null
  if (!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()) {
    error = 'faltan datos del producto'
  } else if (isNaN(price)) {
    error = 'El precio debe ser de tipo numérico'
  } else if (!thumbnail.includes('http')) {
    error = 'La URL de la foto debe iniciar con http'
  }
  return error
}

function validateMessage(data) {
  const emailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { email, message } = data
  let error = null
  if (!email.trim() || !message.trim()) {
    error = 'faltan datos en el mensaje'
  } else if (emailFormat.test(email) === false) {
    error = 'Correo invalido'
  }
  return error
}
