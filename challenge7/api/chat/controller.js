const chatRouter = require('express').Router()
const model = require('./model')

chatRouter.post('/', validateMessage, postMessage)

function postMessage(req, res) {
  const { error } = req
  if (error && error.length > 0) {
    return res.json({ error })
  }
  const { email, message } = req.body
  const newMessage = { email, message }
  model.addMessage(newMessage).then((messageID) => res.json({ messageID }))
}

// helpers

function validateMessage(req, res, next) {
  const { email, message } = req.body
  const emailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.trim() || !message.trim()) {
    req.error = 'faltan datos en el mensaje'
  } else if (emailFormat.test(email) === false) {
    console.log(email)
    req.error = 'Correo invalido'
  }
  next()
}

module.exports = chatRouter
