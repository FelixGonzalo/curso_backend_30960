require('dotenv').config()
const parseArgs = require('minimist')
require('./store/firebase/connection')

const express = require('express')
const productsRouter = require('./api/products/controller')
const chatRouter = require('./api/chat/controller')
const authRouter = require('./api/auth/controller')
const pageRouter = require('./pages')
const systemRouter = require('./api/system/controller')
const randomRouter = require('./api/random/controller')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productsDB = require('./api/products/model')
const chatDB = require('./api/chat/model')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { PORT } = parseArgs(process.argv.slice(2), { alias: { p: "PORT",}, default: { PORT: 8080 } })
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 100,
    }),
    secret: 'clavesecreta',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'pug')
app.use('/api/products', productsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/auth/', authRouter)
app.use('/info', systemRouter)
app.use('/api/randoms', randomRouter)
app.use('/', pageRouter)

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
  let messages = []
  let products = []
  try {
    // messages = await chatDB.getAllMessages()
    messages = await chatDB.getAllMessagesNormalized()
    products = await productsDB.getAllProducts()
  } catch (error) {
    console.error(error)
  } finally {
    socket.emit(keys.PRODUCTS, products)
    socket.emit(keys.CHAT_MESSAGES, messages)
    socket.on(keys.ADD_PRODUCT, sendProducts)
    // socket.on(keys.CHAT_ADD_MESSAGE, sendMessages)
    socket.on(keys.CHAT_ADD_MESSAGE, sendMessagesNormalized)
  }
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

function sendMessagesNormalized() {
  chatDB.getAllMessagesNormalized().then((data) => {
    io.sockets.emit(keys.CHAT_MESSAGES, data)
  })
}
