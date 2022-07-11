import { API } from './config.js'

checkSession()
function checkSession() {
  fetch(`${API}/api/auth/checkSession`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.session.state) {
        document.getElementById('alertSessionActive_message').innerHTML +=
          ' ' + res.session.user
      } else {
        window.location = '/login'
      }
    })
    .catch((err) => {
      alert('ha ocurrido un error: ' + err.message)
    })
}
