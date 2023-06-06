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
    return;
  }
};