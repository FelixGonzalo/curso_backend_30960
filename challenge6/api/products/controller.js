const productsRouter = require('express').Router()
const FakeProductsDB = require('../../store/fakeProductDB')
const productsDB = new FakeProductsDB()

productsRouter.get('/', viewProductPage)

function viewProductPage(req, res) {
  res.render('productPage.pug')
}

module.exports = productsRouter
