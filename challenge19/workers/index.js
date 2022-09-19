import { fork } from 'child_process'
import path from 'path'

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

export {
  worker_getRandomsNoBloqueante
}