import express from 'express'
const router = express.Router()
import authController from '../controllers/authController.js'
import chatController from '../controllers/chatController.js'
import productController from '../controllers/productController.js'
import randomController from '../controllers/randomController.js'
import systemController from '../controllers/systemController.js'
import compression from 'compression'

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.post('/auth/checkSession', authController.checkSession)


router.post('/chat/', chatController.postMessage)
router.get('/chat/test/normalized', chatController.getTestMessages)


router.post('/products/', productController.postProduct)
router.get('/products/test', productController.getProductsTest)
router.get('/products', productController.getProducts)
router.delete('/products/:id', productController.deleteProduct)
router.put('/products', productController.updateProduct)


router.get('/randoms/', randomController.getRandoms)
router.get('/randoms/no-bloqueante', randomController.getRandomsNoBloqueante)


router.get('/info/', systemController.getSystemInformation)
router.get('/info/gzip', compression(), systemController.getSystemInformation)

export default router