const randomService = require('../business/randomService')
const { worker_getRandomsNoBloqueante } = require('../workers')

function getRandoms(req, res) {
  const cant = req.query.cant || 100000000
  const numbers = randomService.handleGetRandoms(cant)
  res.json({ numbers })
}

async function getRandomsNoBloqueante(req, res) {
  const cant = req.query.cant || 100000000
  worker_getRandomsNoBloqueante(cant, res)
}

module.exports = {
  getRandoms,
  getRandomsNoBloqueante
}