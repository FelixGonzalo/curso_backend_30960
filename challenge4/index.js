const express = require('express')
const productsRouter = require('./api/products/controller')
const errors = require('./network/errors')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productsRouter)
app.use(express.static('public'))
app.use(errors)

app.listen(PORT, () => {
  console.log(`Open server on port ${PORT}`)
})
