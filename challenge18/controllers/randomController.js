import randomService from '../business/randomService.js'
import { worker_getRandomsNoBloqueante }  from '../workers/index.js'

function getRandoms(req, res) {
  const cant = req.query.cant || 100000000
  const numbers = randomService.handleGetRandoms(cant)
  res.json({ numbers })
}

async function getRandomsNoBloqueante(req, res) {
  const cant = req.query.cant || 100000000
  worker_getRandomsNoBloqueante(cant, res)
}

export default {
  getRandoms,
  getRandomsNoBloqueante
}