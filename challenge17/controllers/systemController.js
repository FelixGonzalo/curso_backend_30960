const systemService = require('../business/systemService')

function getSystemInformation(req, res){
  res.json(systemService.getSystemInformation())
}

module.exports = {
  getSystemInformation
}