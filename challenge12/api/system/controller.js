const systemRouter = require('express').Router()

systemRouter.get('/', getSystemInformation)

function getSystemInformation(req, res){
  res.json({
    'Argumentos de entrada': process.argv.slice(2),
    'Nombre de la plataforma (sistema operativo)': process.platform,
    'Versión de node.js': process.version,
    'Memoria total reservada (rss)': process.memoryUsage().rss,
    'Path de ejecución':  process.argv.slice(0),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd()
  })
}

module.exports = systemRouter