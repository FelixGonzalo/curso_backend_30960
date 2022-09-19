import pino from 'pino'

function buildDevLogger() {
  const devLogger = pino('debug.log')
  devLogger.level = 'info'
  return devLogger
}

let logger = buildDevLogger()

export default logger