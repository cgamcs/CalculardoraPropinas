let cliente = {
    mesa: '',
    hora: '',
    pedido: []
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
        .then(res => console.log(res))
        .catch(error => console.log(error))
}