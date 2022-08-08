const systemRouter = require('express').Router()
const os = require('os')
const compression = require('compression')
const logger = require('../../logger')

systemRouter.get('/', getSystemInformation)
systemRouter.get('/gzip', compression(), getSystemInformation)

function getSystemInformation(req, res){
  logger.info('Entregando información del sistema correcto')
  const data = {
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Número de procesadores': os.cpus().length,
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd(),
    'Número de procesadores': os.cpus().length,
  }
  console.log(data)
  res.json(data)
}

module.exports = systemRouter