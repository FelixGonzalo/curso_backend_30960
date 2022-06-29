const logoutBtn = document.getElementById('logoutBtn')
import { API } from './config.js'

logoutBtn.addEventListener('click', () => {
  handleLogout()
})

function handleLogout() {
  fetch(`${API}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.session.state) {
        window.location = '/logout'
      }
    })
    .catch((err) => {
      alert('ha ocurrido un error: ' + err.message)
    })
}
