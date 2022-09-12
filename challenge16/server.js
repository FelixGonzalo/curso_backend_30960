require('dotenv').config()
const parseArgs = require('minimist')
require('./persistence/store/firebase/connection')

const express = require('express')
const pageRouter = require('./routes/pages')
const apiRouter = require('./routes/api')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productsDB = require('./persistence/productPersistence')
const chatDB = require('./persistence/chatPersistence')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cluster = require('cluster')
const os = require('os')

const { PORT, MODE } = parseArgs(process.argv.slice(2), { 
  alias: { 
    p: "PORT",
    m: "MODE",
  },
  default: { 
    PORT: 8080,
    MODE: "FORK",
  }
})

if (MODE === 'CLUSTER' && cluster.isPrimary) {
  const numCpus = os.cpus().length

  console.log('SERVIDOR MAESTRO DEL CLUSTER: ')
  console.log('Número de procesadores: ' + numCpus)
  console.log('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
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
  app.use('/', pageRouter)
  app.use('/api', apiRouter)
  
  io.on('connection', main)
  httpServer.listen(PORT, () => console.log(`Open server on port ${PORT} - PID(${process.pid}) - (${new Date().toLocaleString()})`))
  
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
      messages = await chatDB.getAllMessagesNormalized()
      products = await productsDB.getAllProducts()
    } catch (error) {
      console.error(error)
    } finally {
      socket.emit(keys.PRODUCTS, products)
      socket.emit(keys.CHAT_MESSAGES, messages)
      socket.on(keys.ADD_PRODUCT, sendProducts)
      socket.on(keys.CHAT_ADD_MESSAGE, sendMessagesNormalized)
    }
  }
  
  function sendProducts() {
    productsDB.getAllProducts().then((data) => {
      io.sockets.emit(keys.PRODUCTS, data)
    })
  }
  
  function sendMessagesNormalized() {
    chatDB.getAllMessagesNormalized().then((data) => {
      io.sockets.emit(keys.CHAT_MESSAGES, data)
    })
  }
}

