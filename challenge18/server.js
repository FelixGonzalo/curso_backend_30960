import {} from 'dotenv/config'
import parseArgs from 'minimist'
import './persistence/store/firebase/connection.js'

import express from 'express'
import pageRouter from './routes/pages.js'
import apiRouter from './routes/api.js'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import productsDB from './persistence/productPersistence.js'
import chatDB from './persistence/chatPersistence.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cluster from 'cluster'
import os from 'os'
import argsConfig from './argsConfig.js'

const { PORT, MODE } = parseArgs(process.argv.slice(2), argsConfig.config)

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
  
  async function sendProducts() {
    try {
      const r =  await productsDB.getAllProducts()
      io.sockets.emit(keys.PRODUCTS, r)
    } catch (error) {
      console.error(error)
    }
  }
  
  function sendMessagesNormalized() {
    chatDB.getAllMessagesNormalized().then((data) => {
      io.sockets.emit(keys.CHAT_MESSAGES, data)
    })
  }
}

