const chatRouter = require('express').Router()
const model = require('./model')
const bcrypt = require('bcrypt')
const saltRounds = 2

chatRouter.post('/register', validateUserData, register)
chatRouter.post('/login', validateUserData, login)
chatRouter.post('/logout', logout)
chatRouter.post('/checkSession', checkSession)

async function register(req, res) {
  const { email, password } = req.body
  try {
    const users = await model.getAllUsers()
    const foundUser = users.find((user) => user.email === email)
    if (foundUser) {
      return res.status(400).json({
        error: true,
        session: {
          state: false,
          user: email,
        },
        message: `El correo ya está registrado`,
      })
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)

    await model.addUser({ email, password: passwordHash })
    req.session.userName = email
    return res.status(201).json({
      error: false,
      session: {
        state: true,
        user: email,
      },
      message: 'El usuario ha sido registrado',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      session: {
        state: false,
        user: email,
      },
      message: 'Error al registrar usuario',
    })
  }
}

function login(req, res) {
  const { email, password } = req.body
  const userSession = req.session.email
  if (userSession) {
    return res.status(200).json({
      error: false,
      session: {
        state: true,
        user: email,
      },
      message: `El usuario ${userSession} ha iniciado sesión antes`,
    })
  }

  model
    .getAllUsers()
    .then((users) => {
      const foundUser = users.find((user) => user.email === email)

      if (!foundUser) {
        return res.status(400).json({
          error: true,
          session: {
            state: false,
            user: email,
          },
          message: `Error en credenciales`,
        })
      }

      bcrypt.compare(password, foundUser.password).then(function (result) {
        if (!result) {
          return res.status(400).json({
            error: true,
            session: {
              state: false,
              user: email,
            },
            message: `Error en credenciales`,
          })
        }

        req.session.userName = email

        res.status(200).json({
          error: false,
          session: {
            state: true,
            user: email || 'Anonimo',
          },
          message: `Usuario ${email} ha iniciado sesión`,
        })
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({
        error: true,
        session: {
          state: false,
          user: email,
        },
        message: `Error al iniciar sesión`,
      })
    })
}

function logout(req, res) {
  const userSession = req.session.userName
  if (!userSession) {
    return res.status(200).json({
      error: true,
      session: {
        state: false,
        user: '',
      },
      message: `No existe una sesión del usuario`,
    })
  }
  req.session.destroy(function () {
    res.status(200).json({
      error: false,
      session: {
        state: false,
        user: userSession,
      },
      message: `Usuario ${userSession} ha cerrado sesión`,
    })
  })
}

function checkSession(req, res) {
  const userSession = req.session.userName
  if (userSession) {
    return res.status(200).json({
      session: {
        state: true,
        user: userSession,
      },
      message: `El usuario ${userSession} ha iniciado sesión antes`,
    })
  }
  res.status(200).json({
    session: {
      state: false,
      user: '',
    },
    message: `No existe una sesión del usuario`,
  })
}

function validateUserData(req, res, next) {
  const { email, password } = req.body
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (
    !email ||
    !password ||
    !email.trim() ||
    !password.trim() ||
    !emailRegex.test(email)
  ) {
    return res.status(400).json({
      error: true,
      session: {
        state: false,
        user: email,
      },
      message: 'Credenciales incorrectas',
    })
  }
  next()
}

module.exports = chatRouter
