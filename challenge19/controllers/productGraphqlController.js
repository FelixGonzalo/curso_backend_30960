import { buildSchema } from 'graphql'
import productService from '../business/productService.js'

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    price: Float,
    thumbnail: String,
  }
  input ProductInput {
    title: String,
    price: Float,
    thumbnail: String,
  }
  input ProductWithIdInput {
    id: ID!
    title: String,
    price: Float,
    thumbnail: String,
  }
  type Query {
    getProducts: [Product],
  }
  type Mutation {
    addProduct(datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
    updateProduct(datos: ProductWithIdInput): Product, 
  }
`)

async function getProducts() {
  try {
    const products = await productService.getProducts()
    return products
  } catch (error) {
    throw new Error(error.message)
  }
}

async function addProduct({datos}) {
  try {
    const product = await productService.addProduct(datos)
    return product
  } catch (error) {
    throw new Error(error.message)
  }
}

async function deleteProduct({id}) {
  try {
    const product = await productService.deleteProduct(id)
    return product
  } catch (error) {
    throw new Error(error.message)
  }
}

async function updateProduct({datos}) {
  try {
    const {id, title, price, thumbnail} = datos
    const product = await productService.updateProduct(id, { title, price, thumbnail })
    return product
  } catch (error) {
    throw new Error(error.message)
  }
}

const config = {
  schema: schema,
  rootValue: {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
  },
  graphiql: true
}

export default config
