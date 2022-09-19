import systemService from '../business/systemService.js'

function getSystemInformation(req, res){
  res.json(systemService.getSystemInformation())
}

export default {
  getSystemInformation
}