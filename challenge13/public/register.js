const registerForm = document.getElementById('registerForm')
import { API } from './config.js'

registerForm.addEventListener('submit', (e) => {
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
  handleRegister({ email, password })
})

function handleRegister({ email, password }) {
  fetch(`${API}/api/auth/register`, {
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
          title: 'Error al registrar usuario!',
          text: res.message,
        })
      }
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado!',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location = '/'
      })
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario!',
        text: err.message,
      })
    })
}
