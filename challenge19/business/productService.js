import logger from '../logger.js'
import productPersistence from '../persistence/productPersistence.js'

async function addProduct({title, price, thumbnail}) {
  try {
    const isError = validateProduct({title, price, thumbnail})
    if(isError) throw new Error(isError)
    
    const res = productPersistence.addProduct({ title, price, thumbnail })
    logger.info(`Registro de producto exitosa`)
    return res;
  } catch (error) {
    logger.error('Error en addProduct: ' + error.message)
    throw new Error(error.message)
  }
}

async function getProductsTest() {
  return productPersistence.getProductsTest(5);
}

async function getProducts() {
  return productPersistence.getAllProducts();
}

async function deleteProduct(id){
  return productPersistence.deleteProduct(id);
}

async function updateProduct(id, {title, price, thumbnail}){
  return productPersistence.updateProduct(id, {title, price, thumbnail});
}


function validateProduct({title, price, thumbnail}) {
  if (!title || !price || !thumbnail || !title.trim() || !thumbnail.trim()) {
    return 'faltan datos del producto'
  } else if (isNaN(price)) {
    return 'El precio debe ser de tipo numérico'
  } else if (!thumbnail.includes('http')) {
    return 'La URL de la foto debe iniciar con http'
  }
  return false
}

export default {
  addProduct,
  getProductsTest,
  getProducts,
  deleteProduct,
  updateProduct,
}