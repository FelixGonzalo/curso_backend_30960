const Contenedor = require('./contenedor')

const productos = new Contenedor('productos')

console.log('------------- EJEMPLO DE EJECUCION CON USO DE setTimeout\n')

console.log('\n------------- PASO 1: SE AGREGA EL PRIMER PRODUCTO: Laptop\n')

productos.save({
	title: 'Laptop Asus',
	price: 3000,
	thumbnail: 'https://hiraoka.com.pe/media/catalog/product/cache/a357cb11a228eb6f7f15c0ee1ff203af/1/1/119950-1.jpg'
})
	.then(id => console.log(`Objeto guardado con ID: ${id}`))
	.catch(error => console.log(error.message))

setTimeout(() => {
	console.log('\n------------- PASO 2: SE AGREGA EL SEGUNDO PRODUCTO: Teclado\n')
	productos.save({
		title: 'Teclado',
		price: 300,
		thumbnail: 'https://m.media-amazon.com/images/I/61DT+r681TL._AC_SY450_.jpg'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 1000)

setTimeout(() => {
	console.log('\n------------- PASO 3: SE LISTA TODOS LOS PRODUCTOS\n')
	productos.getAll()
		.then(data => console.log(data))
		.catch(error => console.log(error.message))
}, 2000)


setTimeout(() => {
	console.log('\n------------- PASO 4: SE ELIMINAN TODOS LOS PRODUCTOS \n')
	productos.deleteAll()
		.catch(error => console.log(error.message))
}, 3000)

setTimeout(() => {
	console.log('\n------------- PASO 5: SE AGREGA NUEVAMENTE EL PRIMER PRODUCTO: Tv \n')
	productos.save({
		title: 'TV',
		price: 600,
		thumbnail: 'https://i.blogs.es/800731/captura-de-pantalla-2021-06-07-a-las-1.09.46/original.png'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 4000)

setTimeout(() => {
	console.log('\n------------- PASO 6: SE AGREGA NUEVAMENTE EL SEGUNDO PRODUCTO: Peluche panda \n')
	productos.save({
		title: 'Peluche panda',
		price: 100,
		thumbnail: 'https://s3.amazonaws.com/imagenes-sellers-mercado-ripley/2019/06/19154143/P146.jpg'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 5000)

setTimeout(() => {
	console.log('\n------------- PASO 7: SE OBTIENE EL SEGUNDO PRODUCTO: Peluche panda \n')
	productos.getById(2)
		.then(data => console.log(data))
		.catch(error => console.log(error.message))
}, 6000)

setTimeout(() => {
	console.log('\n------------- PASO 8: SE ELIMINA EL SEGUNDO PRODUCTO: Peluche panda \n')
	productos.deleteById(2)
		.catch(error => console.log(error.message))
}, 7000)

setTimeout(() => {
	console.log('\n------------- PASO 9 FINAL: SE LISTA LOS PRODUCTOS RESTANTES \n')
	productos.getAll()
		.then(data => console.log(data))
		.catch(error => console.log(error.message))
}, 8000)






