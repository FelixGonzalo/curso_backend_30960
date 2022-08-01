const loginForm = document.getElementById('loginForm')
const API = 'http://localhost:8080'

checkSession()

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if (
    !email ||
    !password ||
    !email.trim() ||
    !password.trim() ||
    !emailRegex.test(email)
  ) {
    return Swal.fire({
      icon: 'warning',
      title: 'Error en credenciales!',
    })
  }
  handleLogin({ email, password })
})

function handleLogin({ email, password }) {
  fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        return Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión!',
          text: res.message,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Ha iniciado sesión!',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location = '/'
      })
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión!',
        text: err.message,
      })
    })
}

function checkSession() {
  fetch(`${API}/api/auth/checkSession`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.session.state) {
        window.location = '/'
      }
    })
    .catch((err) => {
      alert('ha ocurrido un error: ' + err.message)
    })
}
