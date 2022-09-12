class ProductDto {
  constructor({ id, title, price, thumbnail }) {
      this.id = id
      this.title = title
      this.price = price
      this.thumbnail = thumbnail
  }
}

module.exports = function formatDTO(products) {
  if (Array.isArray(products)) {
      return products.map(obj => new ProductDto(obj))
  } else {
      return new PersonaDTO(products)
  }
}