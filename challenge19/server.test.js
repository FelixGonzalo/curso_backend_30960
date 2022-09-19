import { strictEqual, deepStrictEqual } from 'assert'
import axios from 'axios'

const getProducts = () => axios('http://localhost:8080/api/products/')
const addProduct = ({ title, price, thumbnail }) => axios.post('http://localhost:8080/api/products/', { title, price, thumbnail })
const deleteProduct = (id) => axios.delete('http://localhost:8080/api/products/' + id )
const updateProduct = ({ id, title, price, thumbnail }) => axios.put('http://localhost:8080/api/products/', { id, title, price, thumbnail })

const productsMock = [
  {
    title: "producto 1",
    price: 100,
    thumbnail: "https://lh3.googleusercontent.com/ogw/AOh-ky2CdqY2t24jIxDIHAt3WcEMB0UbaodZsnyL8Ip1fA=s64-c-mo"
  },
  {
    title: "producto 2",
    price: 206.5,
    thumbnail: "https://lh3.googleusercontent.com/ogw/AOh-ky2CdqY2t24jIxDIHAt3WcEMB0UbaodZsnyL8Ip1fA=s64-c-mo"
  }
]

describe("checking that the server works", function () {
  
  it("Should save two products", async function () {
    const { data: beforeData } = await getProducts()
    const res1 = await addProduct(productsMock[0])
    const res2 = await addProduct(productsMock[1])
    const { data: afterData } = await getProducts()

    strictEqual(beforeData.length + 2, afterData.length)
    strictEqual(res1.status, 201)
    strictEqual(res2.status, 201)
  })

  it("Should update one product", async function () {
    const { data: beforeData } = await getProducts()
    const beforeProduct = {
      ...beforeData[0],
      title: "producto editado"
    }
    const res = await updateProduct(beforeProduct)
    const { data: afterData } = await getProducts()
    const afterProduct = afterData.find(obj => obj.id == beforeProduct.id)
    strictEqual(beforeProduct.title, afterProduct.title)
    strictEqual(beforeData.length, afterData.length)
    strictEqual(res.status, 200)
  })

  it("Should delete two product", async function () {
    const { data: beforeData } = await getProducts()
    const res1 = await deleteProduct(beforeData[0].id)
    const res2 = await deleteProduct(beforeData[1].id)
    const { data: afterData } = await getProducts()

    strictEqual(beforeData.length - 2, afterData.length)
    strictEqual(res1.status, 200)
    strictEqual(res2.status, 200)
  })

})