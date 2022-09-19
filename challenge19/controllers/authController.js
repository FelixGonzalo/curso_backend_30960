import authService from '../business/authService.js'

async function register(req, res) {
  const { email, password } = req.body
  try {
    await authService.registerUser(email, password)
    res.status(201).json({
      error: false,
      session: {
        state: true,
        user: email,
      },
      message: 'El usuario ha sido registrado',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      session: {
        state: false,
        user: email,
      },
      message: error.message || 'Error al registrar usuario',
    })
  }
}

async function login(req, res) {
  const { email, password } = req.body
  try {
    const userSession = req.session.email
    if (userSession) throw new Error(`El usuario ${userSession} ha iniciado sesión antes`);

    await authService.loginUser(email, password)
    
    req.session.userName = email
    res.status(200).json({
      error: false,
      session: {
        state: true,
        user: email || 'Anonimo',
      },
      message: `Usuario ${email} ha iniciado sesión`,
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      session: {
        state: false,
        user: email,
      },
      message: error.message || 'Error al iniciar sesión',
    })
  }
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

export default {
  register,
  login,
  logout,
  checkSession
}
