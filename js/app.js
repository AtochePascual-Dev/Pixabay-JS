// * Variables
const formulario = document.querySelector('#formulario');
const resultados = document.querySelector('#resultado');


// * Eventos
// * Caundo el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', validarFormulario);
});



// * FUNCIONES 
// * Validar el formulario
const validarFormulario = (event) => {
  event.preventDefault();

  const terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda === '') {
    mostrarAlerta('Error Agregue un termino de búsqueda');
    return;
  }
};



// * Muestra una alerta en pantalla 
const mostrarAlerta = (mensaje) => {
  const existeAlerta = document.querySelector('.alerta');

  if (!existeAlerta) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta', 'bg-red-100', 'border-red-400', 'font-bold', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mt-6', 'mx-auto', 'max-w-lg', 'text-center');

    formulario.appendChild(alerta);

    // Eliminamos la alerta
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
};