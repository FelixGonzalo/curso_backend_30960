import authPersistence from '../persistence/authPersistence.js'
import bcrypt from 'bcrypt'
import logger from '../logger.js'
const saltRounds = 2

async function registerUser(email, password) {
  try {
    if (validateUserData()) throw new Error("Error en credenciales")

    const users = await authPersistence.getAllUsers()
    const foundUser = users.find((user) => user.email === email)
    if (foundUser) throw new Error("El correo ya está registrado!")

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const addedUser = await authPersistence.addUser({ email, password: passwordHash })
    req.session.userName = email
    logger.info(`Registro de usuario ${email} exitosa`)
    return addedUser
  } catch (error) {
    logger.error('Error en registerUser: ' + error.message)
    throw new Error(error.message)
  }
}

async function loginUser(email, password) {
  try {
    if (validateUserData()) throw new Error("Error en credenciales")

    const users = await authPersistence.getAllUsers()
    const foundUser = users.find((user) => user.email === email)
    if (!foundUser) throw new Error("Error en credenciales")

    const verifyPassword = await bcrypt.compare(password, foundUser.password)
    if (!verifyPassword) throw new Error("Error en credenciales")

    logger.info(`Usuario ${email} ha iniciado sesión`)
    return email
  } catch (error) {
    logger.error('Error en login: ' + error.message)
    throw new Error(error.message)
  }
}


function validateUserData(email, password) {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (
    !email ||
    !password ||
    !email.trim() ||
    !password.trim() ||
    !emailRegex.test(email)
  ) {
    return false
  }
  return true
}

export default {
  registerUser,
  loginUser,
}