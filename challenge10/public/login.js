const loginForm = document.getElementById('loginForm')
const API = 'http://localhost:8080'

checkSession()

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const { userName } = e.target
  if (!userName.value.trim()) {
    return alert('Nombre invalido')
  }
  handleLogin({ userName: userName.value })
})

function handleLogin({ userName }) {
  fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName,
    }),
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
