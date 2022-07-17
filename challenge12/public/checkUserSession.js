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
        window.location = '/'
      } else {
        window.location = '/login'
      }
    })
    .catch((err) => {
      alert('ha ocurrido un error: ' + err.message)
    })
}
