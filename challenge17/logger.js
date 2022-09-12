const pino = require('pino')

function buildDevLogger() {
  const devLogger = pino('debug.log')
  devLogger.level = 'info'
  return devLogger
}

let logger = buildDevLogger()

module.exports = logger