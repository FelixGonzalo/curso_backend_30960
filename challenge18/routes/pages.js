import express from 'express'
const router = express.Router()

router.get('/', (req, r) => r.render('productPage.pug'))
router.get('/register', (req, r) => r.render('registerPage.pug'))
router.get('/login', (req, r) => r.render('loginPage.pug'))
router.get('/logout', (req, r) => r.render('logoutPage.pug'))
router.get('/test/products', (req, r) => r.render('productTestPage.pug'))

export default router