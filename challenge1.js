class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombre) {
        this.mascotas.push(nombre)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({ nombre, autor })
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre)
    }

}

const usuario = new Usuario('Felix', 'Castro')

usuario.addMascota('Isis')
usuario.addMascota('zeus')
usuario.addMascota('coffee')
usuario.addBook('La Odisea', 'Homero')
usuario.addBook('Orgullo y Prejuicio', 'Jane Austen')

console.log('-- USUARIO --')
console.log(`Nombre completo: ${usuario.getFullName()}`)
console.log(`Mascotas: ${usuario.countMascotas()}`)
console.log('libros', usuario.getBookNames())