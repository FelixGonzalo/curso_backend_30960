const socket = io.connect()

// Keys
const keys = {
  PRODUCTS: 'PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  PRODUCTS_ERROR: 'PRODUCTS_ERROR',
  CHAT_MESSAGES: 'CHAT_MESSAGES',
  CHAT_ADD_MESSAGE: 'CHAT_ADD_MESSAGE',
  CHAT_ERROR: 'CHAT_ERROR',
}

// PRODUCTOS

const productForm = document.getElementById('productForm')
const tbodyProducts = document.getElementById('tbodyProducts')
const productFormError = document.getElementById('productFormError')

socket.on(keys.PRODUCTS, renderProductList)
socket.on(keys.PRODUCTS_ERROR, handleProductFormError)

productForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const { title, price, thumbnail } = e.target
  const newProduct = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  }
  socket.emit(keys.ADD_PRODUCT, newProduct)
})

function renderProductList(data) {
  if (data.length === 0)
    return (tbodyProducts.innerHTML =
      '<div class="alert alert-danger mt-4">No hay productos</div>')

  const htmlProductList = data
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td width="120px">
          <img src="${product.thumbnail}" alt="${product.thumbnail}" width="100px"/>
        </td>
      </tr>
    `
    })
    .join('')

  tbodyProducts.innerHTML = htmlProductList
}

function handleProductFormError(error) {
  if (error) {
    productFormError.innerHTML = `
      <div class="alert alert-danger">
        ${error}
      </div>
      `
  } else {
    productFormError.innerHTML = ''
    productForm.reset()
  }
}

// CHAT

const messageList = document.getElementById('messageList')
const chatForm = document.getElementById('chatForm')
const chatFormError = document.getElementById('chatFormError')

socket.on(keys.CHAT_MESSAGES, renderChatMessages)
socket.on(keys.CHAT_ERROR, handleChatFormError)

function renderChatMessages(data) {
  const htmlMessageList = data
    .map((message) => {
      return `
      <p>
        <span class="fw-bold text-danger">${message.email}</span>
        <span class="fw-bold text-success">(${new Date(
          message.date
        ).toLocaleString()}): </span>
        <span>${message.message}</span>
      </p>
    `
    })
    .join('')

  messageList.innerHTML = htmlMessageList
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const { email, message } = e.target
  const newMessage = {
    email: email.value,
    message: message.value,
    date: Date.now(),
  }
  socket.emit(keys.CHAT_ADD_MESSAGE, newMessage)
})

function handleChatFormError(error) {
  if (error) {
    chatFormError.innerHTML = `
      <div class="text-danger mt-1">
        ${error}
      </div>
      `
  } else {
    chatFormError.innerHTML = ''
    chatForm.message.value = ''
  }
}
