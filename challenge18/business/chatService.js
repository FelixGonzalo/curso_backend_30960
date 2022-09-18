import chatPersistence from '../persistence/chatPersistence.js'
import logger from '../logger.js'

async function getTestMessages() {
  return chatPersistence.getAllMessagesNormalized()
}

async function addMessage({ email, name, lastName, age, nick, avatar, text }) {
  try {
    const isError = validateMessage({email, text})
    if(isError) throw new Error(isError)

    const res = chatPersistence.addMessageWithAuthor({ email, name, lastName, age, nick, avatar, text })
    logger.info(`Registro de mensaje de ${email} exitosa`)
    return res
  } catch (error) {
    logger.error('Error en addMessage: ' + error.message)
    throw new Error(error.message)
  }
}

function validateMessage({email, text}) {
  const emailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email.trim() || !text.trim()) {
    return 'faltan datos en el mensaje'
  } else if (emailFormat.test(email) === false) {
    return 'Correo invalido'
  }
  return false
}

export default {
  getTestMessages,
  addMessage,
}
