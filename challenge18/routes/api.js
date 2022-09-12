const router = require('express').Router()
const authController = require('../controllers/authController')
const chatController = require('../controllers/chatController')
const productController = require('../controllers/productController')
const randomController = require('../controllers/randomController')
const systemController = require('../controllers/systemController')
const compression = require('compression')

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.post('/auth/checkSession', authController.checkSession)


router.post('/chat/', chatController.postMessage)
router.get('/chat/test/normalized', chatController.getTestMessages)


router.post('/products/', productController.postProduct)
router.get('/products/test', productController.getProductsTest)


router.get('/randoms/', randomController.getRandoms)
router.get('/randoms/no-bloqueante', randomController.getRandomsNoBloqueante)


router.get('/info/', systemController.getSystemInformation)
router.get('/info/gzip', compression(), systemController.getSystemInformation)

module.exports = router