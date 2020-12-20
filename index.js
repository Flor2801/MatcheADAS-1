const overlay = document.getElementById("bienvenida");
const modalBienvenida = document.getElementById("modal-inicial");
const botonBienvenida = document.getElementById("boton-bienvenida");
const modalFinDeJuego = document.getElementById("fin-de-juego");
const parrafoSegundos = document.getElementById("segundos");
const botonBuscarMatches = document.getElementById("buscar-matches");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const puntaje = document.getElementById("puntaje");
const puntajeFinal = document.getElementById("puntaje-final");
const grilla = document.querySelector(".grilla");
// const botonFacil = document.getElementById("facil");
// const botonMedio = document.getElementById("medio");
// const botonDificil = document.getElementById("dificil");
const nuevoJuego = document.getElementById("nuevo-juego");
// const reiniciarJuego = document.getElementById("reiniciar-juego");
const botonInfo = document.querySelector(".info");
const botonReiniciar = document.querySelector(".reiniciar");

let tamanioPantallaTablet = window.matchMedia(
  "(min-width: 400px) and (max-width: 700px)"
);
let tamanioPantallaCelular = window.matchMedia("(max-width: 399px)");
let tamanioPantallaEscritorio = window.matchMedia("(min-width: 701px)");

let actualizadorDeTiempo = null;

// Establezco la cantidad inicial de 0 para los matches
let matchesAcumuladosHorizontales = 0;
let matchesAcumuladosVerticales = 0;

botonInfo.onclick = () => {
  modalBienvenida.classList.remove("hidden");
  overlay.classList.remove("hidden");
  iniciarJuego();
};

botonReiniciar.onclick = () => {
  iniciarJuego();
  modalFinDeJuego.classList.add("hidden");
  overlay.classList.add("hidden");
  inicializarContador();
};

reiniciarJuego.onclick = () => {
  iniciarJuego();
  modalFinDeJuego.classList.add("hidden");
  overlay.classList.add("hidden");
  inicializarContador();
};

const inicializarContador = () => {
  matchesAcumuladosHorizontales = 0;
  matchesAcumuladosVerticales = 0;
  return (puntaje.innerHTML = 0);
};

// Construccion de Grilla

let items = ["🐷", "🐹", "🦊", "🐶", "🐴", "🐔", "🐷"];
let listaDeAnimales = [];

let animales = "";
let matches = [];

const obtenerNumeroAlAzar = (items) => {
  let largo = items.length;
  return Math.floor(Math.random() * largo);
};
const obtenerAnimalAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)];
};

const crearGrilla = (ancho, alto) => {
  for (let i = 0; i < ancho; i++) {
    listaDeAnimales[i] = [];
    for (let j = 0; j < alto; j++) {
      listaDeAnimales[i][j] = obtenerAnimalAlAzar(items);
    }
  }
  return listaDeAnimales;
};

// ==========> busco matches iniciales para que la grilla no empiece con matches!
const buscarMatchesInicial = () => {
  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      if (
        listaDeAnimales[i][j] === listaDeAnimales[i][j + 1] &&
        listaDeAnimales[i][j] === listaDeAnimales[i][j + 2]
      ) {
        return true;
      }

      if (
        listaDeAnimales[i] &&
        listaDeAnimales[i + 1] &&
        listaDeAnimales[i + 2] &&
        listaDeAnimales[i + 1][j] &&
        listaDeAnimales[i + 2][j] &&
        listaDeAnimales[i][j] === listaDeAnimales[i + 1][j] &&
        listaDeAnimales[i + 1][j] === listaDeAnimales[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
};


const generarCelda = (x, y, array) => {
  let tamanio = 50;

  if (tamanioPantallaTablet.matches) {
    tamanio = 40;
  }

  if (tamanioPantallaCelular.matches) {
    tamanio = 35;
  }

  const celda = document.createElement("div");

  celda.dataset.x = x;
  celda.dataset.y = y;
  celda.innerHTML = array[x][y];
  celda.style.top = `${x * tamanio}px`;
  celda.style.left = `${y * tamanio}px`;
  celda.addEventListener("click", seleccionarItem);
  return celda;
};

const agregarGrillaAHTML = (ancho) => {
  let anchoDeGrilla = 50 * ancho;

  if (tamanioPantallaEscritorio.matches) {
    anchoDeGrilla = 50 * ancho;
  }

  if (tamanioPantallaTablet.matches) {
    anchoDeGrilla = 42 * ancho;
  }

  if (tamanioPantallaCelular.matches) {
    anchoDeGrilla = 38 * ancho;
  }

  grilla.style.width = `${anchoDeGrilla}px`;
  grilla.innerHTML = "";
  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      grilla.appendChild(generarCelda(i, j, listaDeAnimales));
    }
  }
};

const iniciarJuego = () => {
  actualizadorDeTiempo && clearInterval(actualizadorDeTiempo);
  do {
    listaDeAnimales = crearGrilla(6, 6);
  } while (buscarMatchesInicial() === true);
  {
  }
  agregarGrillaAHTML(6);
  parrafoSegundos.textContent = "0 : 30";
  let limiteDeTiempo = new Date();
  limiteDeTiempo.setSeconds(limiteDeTiempo.getSeconds() + 30);
  comenzarCuentaRegresiva(limiteDeTiempo);
};

nuevoJuego.onclick = () => {
  iniciarJuego();
  modalFinDeJuego.classList.add("hidden");
  overlay.classList.add("hidden");
  inicializarContador();
};

botonBienvenida.onclick = () => {
  modalBienvenida.classList.add("hidden");
  overlay.classList.add("hidden");
  iniciarJuego();
  inicializarContador();
  grilla.classList.remove("hidden");
};

//Timer
const obtenerTiempoFaltante = (limiteDeTiempo) => {
  let fechaActual = new Date();
  let tiempoFaltante = (limiteDeTiempo - fechaActual + 1000) / 1000;
  let segundosFaltantes = Math.floor(tiempoFaltante);
  if (segundosFaltantes.toString().length === 1) {
    return "0" + segundosFaltantes;
  } else {
    return segundosFaltantes;
  }
};

const comenzarCuentaRegresiva = (limiteDeTiempo) => {
  //setInterval ejecuta una función (esta funcion obtiene el tiempo restante en cada
  //momento y lo inserta en el p) o un fragmento de código de forma repetitiva
  //cada vez que termina el periodo de tiempo determinado (1000 milisegundos).
  actualizadorDeTiempo = setInterval(() => {
    let segundos = obtenerTiempoFaltante(limiteDeTiempo);
    parrafoSegundos.textContent = "0 : " + segundos;

    if (segundos === "00") {
      //clearInterval cancela una acción reiterativa que se inició mediante una llamada a setInterval.
      //(actualizadorDeTiempo) es el identificador de la acción reiterativa que se desea cancelar.
      clearInterval(actualizadorDeTiempo);
      mostrarModalFinDeJuego();
    }
  }, 1000);
};

const seleccionarItem = (e) => {
  let primeraCeldaSeleccionada = document.querySelector(".remarcar");
  //Si ya existe una celda seleccionada
  if (primeraCeldaSeleccionada != null) {
    const divs = document.querySelectorAll(".grilla div");
    for (let div of divs) {
      div.classList.remove("segundaCelda");
    }
    if (sonAdyacentes(primeraCeldaSeleccionada, e.target)) {
      e.target.classList.add("segundaCelda");
      intercambiarCeldas(primeraCeldaSeleccionada, e.target);
      obtenerMatches();
    } else {
      primeraCeldaSeleccionada.classList.remove("remarcar");
      e.target.classList.add("remarcar");
    }
  }

  // Si no hay ninguna celda seleccionada
  else e.target.classList.add("remarcar");
};
//Devuelve verdadero si dos celdas son adyacentes y falso si no lo

const sonAdyacentes = (celda1, celda2) => {
  const datax1 = Number(celda1.dataset.x);
  const datax2 = Number(celda2.dataset.x);
  const datay1 = Number(celda1.dataset.y);
  const datay2 = Number(celda2.dataset.y);
  if (
    (datax1 === datax2 && datay1 === datay2 + 1) ||
    (datax1 === datax2 && datay1 === datay2 - 1) ||
    (datay1 === datay2 && datax1 === datax2 + 1) ||
    (datay1 === datay2 && datax1 === datax2 - 1)
  ) {
    return true;
  } else {
    return false;
  }
};

const intercambiarCeldas = (celda1, celda2) => {
  const datax1 = Number(celda1.dataset.x);
  const datax2 = Number(celda2.dataset.x);
  const datay1 = Number(celda1.dataset.y);
  const datay2 = Number(celda2.dataset.y);

  const tamanio = 50;

  // aqui modifico la grilla en JS
  let variableTemporal = listaDeAnimales[datax1][datay1];
  listaDeAnimales[datax1][datay1] = listaDeAnimales[datax2][datay2];
  listaDeAnimales[datax2][datay2] = variableTemporal;

  // aqui modifico la grilla en HTML

  if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
    celda1.style.left = `${datay2 * tamanio}px`;
    celda2.style.left = `${datay1 * tamanio}px`;
    celda1.dataset.y = datay2;
    celda2.dataset.y = datay1;
  } else if (
    datay1 === datay2 &&
    (datax1 === datax2 + 1 || datax1 === datax2 - 1)
  ) {
    celda1.style.top = `${datax2 * tamanio}px`;
    celda2.style.top = `${datax1 * tamanio}px`;
    celda1.dataset.x = datax2;
    celda2.dataset.x = datax1;
  }
};

// Obtener Matches y desaparecerlos

const deseleccionarItem = () => {
  let celda = document.querySelector(".remarcar");
  if (celda != null) {
    celda.classList.remove("remarcar");
  }
};

// Hace descender los items cuando hay matches y quedan espacios vacios
const descenderCelda = (celda) => {
  const x = Number(celda.dataset.x);
  const y = Number(celda.dataset.y);
  const tamanio = 50;

  // aqui modifico la grilla en JS
  listaDeAnimales[x + 1][y] = listaDeAnimales[x][y];

  //aqui modifico la grilla en HTML
  celda.style.top = `${x * tamanio + 50}px`;
  celda.dataset.x = x + 1;
};

// MATCHES HORIZONTALES
// Esta funcion se utiliza para hacer descender los items cuando hay un match horizontal 
// y agrega elementos nuevos en la fila superior
const reacomodarFilas = (matchesHorizontales) => {
  for (let i = 0; i < matchesHorizontales.length; i++) {
    let numeroDeDescensos = matchesHorizontales[i][0];
    let numColumna = matchesHorizontales[i][1];

    //Caso en que el match sea en la primera fila (fila 0)
    if (numeroDeDescensos === 0) {
  
     setTimeout(() => { agregarCeldaEnFilaSuperior(numColumna)},500)
    } else {
      // caso en que el match sea en una fila inferior a la primera (fila 0)
      let k = numeroDeDescensos

      for (let j = 0; j < numeroDeDescensos; j++) {
        let celdaADescender = document.querySelector(
          `div[data-x='${k - 1}'][data-y='${matchesHorizontales[i][1]}']`
        );
        k--;

        descenderCelda(celdaADescender);
      }
       
     setTimeout(() => { agregarCeldaEnFilaSuperior(numColumna)},500)

    }
  }
  //este booleano se va a utilizar en la funcion obtenerMatches()para indicar que NO tengo que ejecutar el código
  //que intercambia las celdas ya que hubo un match anteriormente.
seEjecutoIntercambiarItem= false
//llamo a la funcion obtenerMatches() para verificar si,despues de reacomodar las celdas hay un match nuevo.
  obtenerMatches()
}

// Crea un nuevo item para agregarlo a partir en la fila 0
agregarCeldaEnFilaSuperior = (numColumna) => {
  //agrega el animal en la matriz
  listaDeAnimales[0][numColumna] = obtenerAnimalAlAzar(items);

  //crea el div y lo agrega al HTML
  let celdaAlTope = generarCelda(0, numColumna, listaDeAnimales);
  grilla.appendChild(celdaAlTope);
};


// MATCHES VERTICALES
// Desciende items ya existentes cuando hay un match vertical
const reacomodarColumnas = (matchesVerticales) => {
  let cantidadDeCeldasEncima = matchesVerticales[0][0];
  let k = cantidadDeCeldasEncima;
  for (let i = 0; i < cantidadDeCeldasEncima; i++) {
    let celdaADescender = document.querySelector(
      `div[data-x='${k - 1}'][data-y='${matchesVerticales[i][1]}']`
    );
    k--;
    for (let j = 0; j < 3; j++) {
      descenderCelda(celdaADescender);
    }
  }
  for (let i = 0; i < 3; i++) {
    listaDeAnimales[i][matchesVerticales[0][1]] = obtenerAnimalAlAzar(items);

    listaDeAnimales[i][matchesVerticales[0][1]] = obtenerAnimalAlAzar(items)

    let celda = generarCelda(i, matchesVerticales[0][1], listaDeAnimales)
     
    setTimeout(() => {grilla.appendChild(celda)},500)
    
  }
    //este booleano se va a utilizar en la funcion obtenerMatches()para indicar que NO tengo que ejecutar el código
  //que intercambia las celdas ya que hubo un match anteriormente.
  seEjecutoIntercambiarItem= false
  //llamo a la funcion obtenerMatches() para verificar si,despues de reacomodar las celdas hay un match nuevo.
  obtenerMatches()
}



// Variables para acumular cantidad de matches (1 x cada combinacion)
let matchesAcumuladosHorizontales = 0
let matchesAcumuladosVerticales = 0

// Funcion que revisa si hay coincidencia de 3 o mas items
const obtenerMatches = () => {
  let matchesHorizontales = [];
  let matchesVerticales = [];

  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {

      if (listaDeAnimales[i][j] === listaDeAnimales[i][j + 1] && listaDeAnimales[i][j] === listaDeAnimales[i][j + 2]) {

        matchesHorizontales.push([i, j])
        matchesHorizontales.push([i, j + 1])
        matchesHorizontales.push([i, j + 2])

        matchesAcumuladosHorizontales += 1
      }

      if (listaDeAnimales[i + 1] && listaDeAnimales[i + 2] && listaDeAnimales[i][j] === listaDeAnimales[i + 1][j] && listaDeAnimales[i + 1][j] === listaDeAnimales[i + 2][j]) {

        matchesVerticales.push([i, j])
        matchesVerticales.push([i + 1, j])
        matchesVerticales.push([i + 2, j])

        matchesAcumuladosVerticales += 1
      }
    }
  }

  //Declaramos las variables de los elementos actualmente seleccionados
  let primera = document.querySelector(".remarcar")
  let segunda = document.querySelector(".segundaCelda")

  // Devolvemos los items a sus lugares si no hay matches y si la funcion que se ejecutó anteriormente fue seleccionarItem()
  //Esto ultimo se debe a que la funcion obtnerMatches puede ser llamada desde seleccionarItem(),reacomodarFilas() y reacomodarColumna(). En estos dos últimos casos 
  //no tiene sentido devolver los items a su lugar.
  if (matchesHorizontales.length == 0 && matchesVerticales.length == 0 && seEjecutoIntercambiarItem) {
    setTimeout(() => { intercambiarCeldas(primera, segunda) }, 500)
    primera.classList.remove("remarcar")
    segunda.classList.remove("segundaCelda")

  }
  puntosTotales()

  //solo deseleccionar item si se produjo un match
  if (matchesHorizontales.length > 0 || matchesVerticales.length > 0) {
    deseleccionarItem();
  }

  const obtenerCuadrado = (arr) => {
    return document.querySelector(
      `div[data-x='${arr[0]}'][data-y='${arr[1]}']`
    );
  };

  const desaparecerAnimal = (celda) => {
    if (celda != null) grilla.removeChild(celda);
  };

  for (let i = 0; i < matchesHorizontales.length; i++) {
    const celda = obtenerCuadrado(matchesHorizontales[i]);

    setTimeout(() => {
      desaparecerAnimal(celda);
    }, 100);
  }

  for (let i = 0; i < matchesVerticales.length; i++) {
    const celda = obtenerCuadrado(matchesVerticales[i]);

    setTimeout(() => {
      desaparecerAnimal(celda);
    }, 100);
  }

  //reacomodar filas y columnas si se produjo un match
  if (matchesHorizontales.length > 0) {
    reacomodarFilas(matchesHorizontales);
  }
  if (matchesVerticales.length > 0) {
    reacomodarColumnas(matchesVerticales);
  }
};


// Acumulador de puntos por cada match
const puntosTotales = () => {
  let puntajeVertical = 0;
  let puntajeHorizontal = 0;

  for (let i = 0; i < matchesAcumuladosVerticales; i++) {
    puntajeVertical += 100
  }

  for (let i = 0; i < matchesAcumuladosHorizontales; i++) {
    puntajeHorizontal += 100
  }

  puntaje.innerHTML = puntajeVertical + puntajeHorizontal
  puntajeFinal.innerHTML = puntajeVertical + puntajeHorizontal
}

puntosTotales()
// deseleccionarItem()
// reacomodarFilas(matchesHorizontales)
// reacomodarFilas(matchesVerticales)


const inicializarContador = () => {
  puntaje.innerHTML = 0
}

const mostrarModalFinDeJuego = () => {
  modalFinDeJuego.classList.remove("hidden");
  overlay.classList.remove("hidden");
  inicializarContador();
};
