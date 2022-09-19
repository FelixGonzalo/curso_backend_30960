import productService from '../business/productService.js'

async function postProduct(req, res) {
  try {
    const { title, price, thumbnail } = req.body
    const productID = await productService.addProduct({title, price, thumbnail})
    res.status(201).json({ productID })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al agregar producto' })
  }
}

async function getProductsTest(req, res) {
  try {
    const products = await productService.getProductsTest()
    res.json(products)
  } catch (error) {
    res.json([])
  }
}

async function getProducts(req, res) {
  try {
    const products = await productService.getProducts()
    res.json(products)
  } catch (error) {
    res.json([])
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params
    const product = await productService.deleteProduct(id)
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al eliminar el producto' })
  }
}

async function updateProduct(req, res) {
  try {
    const { id, title, price, thumbnail } = req.body
    const product = await productService.updateProduct(id, { title, price, thumbnail })
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al actualizar producto' })
  }
}

export default {
  postProduct,
  getProductsTest,
  getProducts,
  deleteProduct,
  updateProduct,
}
