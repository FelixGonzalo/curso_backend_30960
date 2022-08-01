const pageRouter = require('express').Router()

pageRouter.get('/', (req, r) => r.render('productPage.pug'))
pageRouter.get('/register', (req, r) => r.render('registerPage.pug'))
pageRouter.get('/login', (req, r) => r.render('loginPage.pug'))
pageRouter.get('/logout', (req, r) => r.render('logoutPage.pug'))
pageRouter.get('/test/products', (req, r) => r.render('productTestPage.pug'))

module.exports = pageRouter
