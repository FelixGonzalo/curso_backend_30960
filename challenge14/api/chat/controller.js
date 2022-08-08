const chatRouter = require('express').Router()
const logger = require('../../logger')
const model = require('./model')

chatRouter.post('/', validateMessage, postMessage)
chatRouter.get('/test/normalized', getTestMessages)

function getTestMessages(req, res) {
  model.getAllMessagesNormalized().then((data) => {
    return res.json(data)
  })
}

function postMessage(req, res) {
  const { error } = req
  if (error && error.length > 0) {
    logger.error('Error postMessage: ' + error)
    return res.json({ error })
  }
  const { email, name, lastName, age, nick, avatar, text } = req.body
  const newMessage = {
    email,
    name,
    lastName,
    age,
    nick,
    avatar,
    text,
  }
  model
    .addMessageWithAuthor(newMessage)
    .then((messageID) => res.json({ messageID }))
    .catch((error) => {
      console.error(error)
      logger.error('Error postMessage: ' + error.message)
      res.json({ error: 'Error en la operación' })
    })
}

// helpers

function validateMessage(req, res, next) {
  const { email, text } = req.body
  const emailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.trim() || !text.trim()) {
    req.error = 'faltan datos en el mensaje'
  } else if (emailFormat.test(email) === false) {
    console.log(email)
    req.error = 'Correo invalido'
  }
  next()
}

module.exports = chatRouter
