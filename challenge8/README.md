# Challenge8: MONGODB

## 0) CONSIGNA

Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga
dos colecciones: mensajes y productos.

terminal 1:

```
// crear la carpeta ecommerce en ruta X.
--dbpath=/rutaX/ecommerce
```

terminal 2:

```
mongo
use ecommerce
```

## Puntos

1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

```
db.mensajes.insertMany([
  {email: "pepe@gmail.com", message: "hola soy pepe", timestamp: ISODate()},
  {email: "juan@gmail.com", message: "hola soy juan", timestamp: ISODate()},
  {email: "miguel@gmail.com", message: "hola soy miguel", timestamp: ISODate()},
  {email: "pepe@gmail.com", message: "necesito ayuda", timestamp: ISODate()},
  {email: "juan@gmail.com", message: "el precio del producto?", timestamp: ISODate()},
  {email: "pepe@gmail.com", message: "tienen en stock el producto", timestamp: ISODate()},
  {email: "miguel@gmail.com", message: "un momento", timestamp: ISODate()},
  {email: "juan@gmail.com", message: "ok", timestamp: ISODate()},
  {email: "pepe@gmail.com", message: "hay cupones de descuento?", timestamp: ISODate()},
  {email: "pepe@gmail.com", message: "espero, gracias", timestamp: ISODate()}
])

db.productos.insertMany([
  {title: "TV", price: 700, thumbnail: "https://picsum.photos/200/300"},
  {title: "Peluche de oso", price: 64, thumbnail: "https://picsum.photos/200/300"},
  {title: "Teclado", price: 100, thumbnail: "https://picsum.photos/200/300"},
  {title: "Silla", price: 150, thumbnail: "https://picsum.photos/200/300"},
  {title: "Mesa portatil", price: 200, thumbnail: "https://picsum.photos/200/300"},
  {title: "cocina", price: 150, thumbnail: "https://picsum.photos/200/300"},
  {title: "jeans", price: 120, thumbnail: "https://picsum.photos/200/300"},
  {title: "laptop", price: 2500, thumbnail: "https://picsum.photos/200/300"},
  {title: "TV ultra", price: 900, thumbnail: "https://picsum.photos/200/300"},
  {title: "Celular", price: 800, thumbnail: "https://picsum.photos/200/300"},
])
```

3. Listar todos los documentos en cada colección.

```
db.mensajes.find()
db.productos.find()
```

4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

```
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()
```

5. Realizar un CRUD sobre la colección de productos:

a) Agregar un producto más en la colección de productos

```
db.productos.insert({title: "laptop ultra", price: 3200, thumbnail: "https://picsum.photos/200/300"})

```

b) Realizar una consulta por nombre de producto específico:

- Listar los productos con precio menor a 1000 pesos.
- ii) Listar los productos con precio entre los 1000 a 3000 pesos.
- iii) Listar los productos con precio mayor a 3000 pesos.
- iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```
db.productos.find({price: {$lt: 1000}})
db.productos.find({price: {$in: [1000, 3000]}})
db.productos.find({price: {$gt: 3000}})
db.productos.find({}, {"title": 1}).sort({price: 1}).skip(2).limit(1)
```

c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.productos.update({},{$set:{stock:100}},{upsert:false,multi:true})
```

d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

```
db.productos.update({price: {$gt: 4000}},{$set:{stock:0}},{upsert:false,multi:true})
```

e) Borrar los productos con precio menor a 1000 pesos

```
db.productos.deleteMany({price: {$lt: 1000}})
```

6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

```
use admin
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})
```

Reiniciar el servicio y probar el usuario:

terminal 1:

```
--dbpath=/home/felix/Desktop/fekilo/ecommerce --auth
```

terminal 2:

```
mongo -u pepe -p asd456
use ecommerce
db.productos.find()
```
