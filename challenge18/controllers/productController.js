import productService from '../business/productService.js'

async function postProduct(req, res) {
  try {
    const { title, price, thumbnail } = req.body
    console.log("mira", { title, price, thumbnail })
    const productID = await productService.addProduct({title, price, thumbnail})
    res.json({ productID })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar producto' })
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

export default {
  postProduct,
  getProductsTest,
  getProducts,
}
