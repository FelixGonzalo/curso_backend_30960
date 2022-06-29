const chatRouter = require('express').Router()

chatRouter.post('/login', login)
chatRouter.post('/logout', logout)
chatRouter.post('/checkSession', checkSession)

function login(req, res) {
  const { userName } = req.body
  const userSession = req.session.userName
  if (userSession) {
    return res.status(200).json({
      session: {
        state: true,
        user: userName,
      },
      message: `El usuario ${userSession} ha iniciado sesión antes`,
    })
  }
  if (!userName || !userName.trim()) {
    return res.status(406).json({
      session: {
        state: false,
        user: '',
      },
      message: 'Nombre de usuario incorrecto',
    })
  }
  req.session.userName = userName
  res.status(200).json({
    session: {
      state: true,
      user: req.session.userName || 'Anonimo',
    },
    message: `Usuario ${userName} ha iniciado sesión`,
  })
}

function logout(req, res) {
  const userSession = req.session.userName
  if (!userSession) {
    return res.status(200).json({
      session: {
        state: false,
        user: '',
      },
      message: `No existe una sesión del usuario`,
    })
  }
  req.session.destroy(function () {
    res.status(200).json({
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

module.exports = chatRouter
