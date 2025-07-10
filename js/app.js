let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')
btnGuardarCliente.addEventListener('click', guardarCliente)

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').value

    // Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some( campo => campo === '')

    if(camposVacios) {
        const alertaExiste = document.querySelector('.invalid-feedback')

        if(!alertaExiste) {
            const alerta = document.createElement('DIV')
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center')
            alerta.textContent = 'Todos los cambos son obligatorios'

            document.querySelector('.modal-body form').appendChild(alerta)

            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }

        return
    }

    /*
        Asignamos una copia del objeto para que guarde
        los pedidos aunque aun no lo hagamos y despues
        guarda la informacion de mesa y hora
    */
    cliente = { ...cliente, mesa, hora }

    // Ocultar modal al enviar el formulario (bootstrap)
    const modalFormulario = document.querySelector('#formulario')
    const bootstrapModal = bootstrap.Modal.getInstance(modalFormulario)
    bootstrapModal.hide()

    // Mostrar las secciones
    mostrarSecciones()

    // Obtener platillos de la API
    obtenerPlatillos()
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none')
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'))
}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos'

    fetch(url)
        .then(res => res.json())
        .then(res => mostrarPlatillos(res))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido')

    platillos.forEach(platillo => {
        const row = document.createElement('DIV')
        row.classList.add('row', 'py-3', 'border-top')

        const nombre = document.createElement('DIV')
        nombre.classList.add('col-md-4')
        nombre.textContent = platillo.nombre

        const precio = document.createElement('DIV')
        precio.classList.add('col-md-3', 'fw-bold')
        precio.textContent = `$ ${platillo.precio}`

        const categoria = document.createElement('DIV')
        categoria.classList.add('col-md-3')
        categoria.textContent = categorias[ platillo.categoria ]

        const inputCantidad = document.createElement('INPUT')
        inputCantidad.type = 'number'
        inputCantidad.min = 0
        inputCantidad.value = 0
        inputCantidad.id = `producto-${platillo.id}`
        inputCantidad.classList.add('form-control')

        // Funcion que detecta la cantidad y el platillo que se esta agregando
        inputCantidad.onchange = () => {
            const cantidad = parseInt(inputCantidad.value)
            agregarPlatillo({...platillo, cantidad}) // Crear una copia para que el objeto "platillo" no este en un objeto separado a cantidad
        }

        const agregar = document.createElement('DIV')
        agregar.classList.add('col-md-2')

        agregar.appendChild(inputCantidad)

        row.appendChild(nombre)
        row.appendChild(precio)
        row.appendChild(categoria)
        row.appendChild(agregar)

        contenido.appendChild(row)
    })
}

function agregarPlatillo(producto) {
    // Extraer el pedido actual
    let { pedido } = cliente

    // Revisar que la cantidad sea mayor a 0
    if(producto.cantidad > 0) {
        cliente.pedido = [...pedido, producto]

        console.log(cliente.pedido)

        return
    }

    console.log(cliente.pedido)
}