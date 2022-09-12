const API = 'http://localhost:8080'

function getProductsData() {
  fetch(`${API}/api/products/test`)
    .then((res) => res.json())
    .then((data) => renderProducts(data))
}
getProductsData()

function renderProducts(data) {
  const tbodyProducts = document.getElementById('tbodyProducts')
  let htmlTable = ''

  data.forEach(({ title, price, thumbnail }) => {
    htmlTable += `<tr>
    <td>${title}</td>
    <td>${price}</td>
    <td width='100px'>
      <img src='${thumbnail}' alt='${title}' width='100px' />
    </td>
  </tr>`
  })
  tbodyProducts.innerHTML = htmlTable
}
