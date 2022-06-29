require('dotenv').config()
require('./store/firebase/connection')

const express = require('express')
const productsRouter = require('./api/products/controller')
const chatRouter = require('./api/chat/controller')
const authRouter = require('./api/auth/controller')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productsDB = require('./api/products/model')
const chatDB = require('./api/chat/model')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://fekilo:fekilo@cluster0.mcbzk.mongodb.net/?retryWrites=true&w=majority',
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
app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'pug')
app.use('/api/products', productsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/auth/', authRouter)
app.get('/', viewProductPage)
app.get('/test/products', viewProductTestPage)
app.get('/login', viewLoginPage)
app.get('/logout', viewLogoutPage)

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

function viewProductPage(req, res) {
  res.render('productPage.pug')
}

function viewProductTestPage(req, res) {
  res.render('productTestPage.pug')
}

function viewLoginPage(req, res) {
  res.render('loginPage.pug')
}

function viewLogoutPage(req, res) {
  res.render('logoutPage.pug')
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
