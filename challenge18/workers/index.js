const {fork} = require('child_process')
const path = require('path')

function worker_getRandomsNoBloqueante(cant = 100000000, res) {
  const computo = fork(path.resolve(__dirname, 'worker_getRandomsNoBloqueante.js'))
  computo.on('message', numbers => {
    if(numbers === 'listo') {
      computo.send(cant)
    } else {
      res.json({numbers})
    }
  })
}

module.exports = {
  worker_getRandomsNoBloqueante
}