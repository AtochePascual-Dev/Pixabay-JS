// * Variables
const formulario = document.querySelector('#formulario');
const resultados = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const elementosPorPaginas = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;
let terminoBusqueda;

// * Eventos
// * Caundo el documento esta listo
document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', validarFormulario);
});



// * FUNCIONES 
// * Validar el formulario
const validarFormulario = (event) => {
  event.preventDefault();

  terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda === '') {
    mostrarAlerta('Error Agregue un termino de búsqueda');
    return;
  }

  buscarImagenes(terminoBusqueda);
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



// * Busca las imagenes en la API
const buscarImagenes = async (terminoBusqueda, paginaActual = 1) => {
  const key = '37058740-fc59b10279e7ee3461bcbab29';
  const URL = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=${elementosPorPaginas}&page=${paginaActual}`;

  // fetch(URL)
  //   .then(respueta => respueta.json())
  //   .then(resultado => {
  //     totalPaginas = calcularCantidadPaginas(resultado.totalHits);
  //     mostrarImagenes(resultado.hits);
  //   })

  try {
    const respueta = await fetch(URL);
    const resultado = await respueta.json();
    totalPaginas = calcularCantidadPaginas(resultado.totalHits);
    mostrarImagenes(resultado.hits);
  } catch (error) {
    console.log(error);
  }

};



// * Muestra las imagenes en pantalla
const mostrarImagenes = (imagenes) => {

  // Limpiamos los resultados previos
  while (resultados.firstChild) {
    resultados.firstChild.remove();
  }

  // Iteramos sobre las imagenes
  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultados.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4">
      <div class="bg-white m-2">
        <img class="w-full h-56 object-cover" src="${previewURL}">
        <div class="p-2">
          <p class="font-bold">${likes} <span class="font-light">Me Gusta</span></p>
          <p class="font-bold">${views} <span class="font-light">Vistas</span></p>
          <a href="${largeImageURL}" class="block w-full bg-blue-800 hover:bg-blue-500 text-white text-center uppercase font-bold rounded p-1 mt-2" target="_blank" rel="noopener noreferrer">
          Ver Imagen HD
          </a>
        </div>
      </div>
    </div>
    `;
  });

  // Limpiamos el paginador previo
  while (paginacionDiv.firstChild) {
    paginacionDiv.firstChild.remove();
  }

  imprimirPaginador();
};



// * Calcula la cantidad de paginas para realizar la paginacion
/* Calcular el todal de las paginas diviendo el total de elementos entre la cantidad de elementos que queremos por pagina y redondemos hacia arriba para no dejar elementos sobrantes */
const calcularCantidadPaginas = (total) => parseInt(Math.ceil(total / elementosPorPaginas));



// * Imprime las paginas
const imprimirPaginador = () => {
  iterador = generadorPaginas(totalPaginas);

  while (true) {
    const { value, done } = iterador.next();

    // Caundo el iterdor llegue al final sale de la funcion
    if (done) return;

    const boton = document.createElement('A');
    boton.href = "#";
    boton.textContent = value;
    boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-2', 'rounded');
    boton.onclick = () => {
      paginaActual = value;
      buscarImagenes(terminoBusqueda, paginaActual);
    };

    paginacionDiv.appendChild(boton);
  }
};



// * Genera las  paginacion
function* generadorPaginas(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
};