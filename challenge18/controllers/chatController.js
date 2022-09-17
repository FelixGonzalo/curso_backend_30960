import chatService from '../business/chatService.js'

async function getTestMessages(req, res) {
  try {
    const messages = await chatService.getAllMessagesNormalized()
    res.json(messages)
  } catch (error) {
    res.json([])
  }
}

async function postMessage(req, res) {
  try {
    const { email, name, lastName, age, nick, avatar, text } = req.body
    const messageID = await chatService.addMessage({ email, name, lastName, age, nick, avatar, text })
    res.json({ messageID })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar mensaje' })
  }
}

export default {
  postMessage,
  getTestMessages,
}
