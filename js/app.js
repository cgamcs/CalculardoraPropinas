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
}