const overlay = document.getElementById('bienvenida')
const modalBienvenida = document.getElementById('modal-inicial')
const botonBienvenida = document.getElementById('boton-bienvenida')
const modalFinDeJuego = document.getElementById('fin-de-juego')
const parrafoSegundos = document.getElementById("segundos")
const botonBuscarMatches = document.getElementById("buscar-matches")
const reiniciarJuego = document.getElementById("reiniciar-juego")
const puntaje = document.getElementById("puntaje")
const puntajeFinal = document.getElementById("puntaje-final")
let tamanio = 50

let tamanioPantallaCelular1 = window.matchMedia("screen (min-device-width: 400px) and (max-width: 700px)");
let tamanioPantallaCelular2 = window.matchMedia("screen (max-width: 399px)");
let tamanioPantallaCelular3 = window.matchMedia("screen (min-width: 701px)");


const grilla = document.querySelector(".grilla");
// const botonFacil = document.getElementById("facil");
// const botonMedio = document.getElementById("medio");
// const botonDificil = document.getElementById("dificil");
const nuevoJuego = document.getElementById("nuevo-juego");
// const reiniciarJuego = document.getElementById("reiniciar-juego");

const botonInfo = document.querySelector(".info")
const botonReiniciar = document.querySelector(".reiniciar")

let actualizadorDeTiempo = null


botonInfo.onclick = () => {
  modalBienvenida.classList.remove('hidden')
  overlay.classList.remove('hidden')
  iniciarJuego();
}

botonReiniciar.onclick = () => {
  iniciarJuego();
  modalFinDeJuego.classList.add("hidden")
  overlay.classList.add('hidden')
}

reiniciarJuego.onclick = () => {
  iniciarJuego()
  modalFinDeJuego.classList.add("hidden")
  overlay.classList.add('hidden')
}


// Grilla

let items = ["🐷", "🐹", "🦊", "🐶", "🐴", "🐔", "🐷", "🐸", "🐤", "🐱"];
let listaDeAnimales = [];

let animales = "";
let matches = []

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
  return listaDeAnimales
};


// ==========> busco matches iniciales para que la grilla no empiece con matches! 
const buscarMatchesInicial = () => {
  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      if (listaDeAnimales[i][j] === listaDeAnimales[i][j + 1] && listaDeAnimales[i][j] === listaDeAnimales[i][j + 2]) {
        return true
      }

      if (listaDeAnimales[i] && listaDeAnimales[i + 1] && listaDeAnimales[i + 2] &&
        listaDeAnimales[i + 1][j] && listaDeAnimales[i + 2][j] && listaDeAnimales[i][j] === listaDeAnimales[i + 1][j] && listaDeAnimales[i + 1][j] === listaDeAnimales[i + 2][j]) {
        return true
      }
    }
  }
  return false
}

const generarCelda = (x, y, array) => {
  let tamanio = 50

  // if (tamanioPantallaCelular3) {
  //    tamanio = 50
  // } 

  // if (tamanioPantallaCelular1) {
  //    tamanio = 45
  // }

  // if (tamanioPantallaCelular2) {
  //   tamanio = 40
  // }

  const celda = document.createElement('div')
  celda.dataset.x = x
  celda.dataset.y = y
  celda.innerHTML = array[x][y]
  celda.style.top = `${x * tamanio}px`
  celda.style.left = `${y * tamanio}px`
  celda.addEventListener('click', seleccionarItem)
  return celda
}

const agregarGrillaAHTML = (ancho) => {
  let anchoDeGrilla = 50 * ancho

  
//   if (tamanioPantallaCelular1) {
//     anchoDeGrilla = 45
//  }

//  if (tamanioPantallaCelular2) {
//   anchoDeGrilla = 40
//  }


  grilla.style.width = `${anchoDeGrilla}px`
  grilla.innerHTML = ""
  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      grilla.appendChild(generarCelda(i, j, listaDeAnimales))
    }
  }
}

const iniciarJuego = () => {
  actualizadorDeTiempo && clearInterval(actualizadorDeTiempo)

  do {
    listaDeAnimales = crearGrilla(6, 6)
  }
  while
    (buscarMatchesInicial() === true) {
  }
  agregarGrillaAHTML(6)
  parrafoSegundos.textContent = "0 : 30"
  let limiteDeTiempo = new Date()
  limiteDeTiempo.setSeconds(limiteDeTiempo.getSeconds() + 30)
  comenzarCuentaRegresiva(limiteDeTiempo)
  inicializarContador()
}

nuevoJuego.onclick = () => {
  iniciarJuego()
  modalFinDeJuego.classList.add("hidden")
  overlay.classList.add('hidden')
}

botonBienvenida.onclick = () => {
  modalBienvenida.classList.add('hidden')
  overlay.classList.add('hidden')
  iniciarJuego();
}


//Timer

const obtenerTiempoFaltante = (limiteDeTiempo) => {
  let fechaActual = new Date()
  let tiempoFaltante = ((limiteDeTiempo - fechaActual) + 1000) / 1000
  let segundosFaltantes = Math.floor(tiempoFaltante)
  if (segundosFaltantes.toString().length === 1) {
    return "0" + segundosFaltantes
  }
  else {
    return segundosFaltantes
  }
}

const comenzarCuentaRegresiva = (limiteDeTiempo) => {
  //setInterval ejecuta una función (esta funcion obtiene el tiempo restante en cada 
  //momento y lo inserta en el p) o un fragmento de código de forma repetitiva 
  //cada vez que termina el periodo de tiempo determinado (1000 milisegundos).
  actualizadorDeTiempo = setInterval(() => {

    let segundos = obtenerTiempoFaltante(limiteDeTiempo)
    parrafoSegundos.textContent = "0 : " + segundos

    if (segundos === "00") {
      //clearInterval cancela una acción reiterativa que se inició mediante una llamada a setInterval.
      //(actualizadorDeTiempo) es el identificador de la acción reiterativa que se desea cancelar.
      clearInterval(actualizadorDeTiempo)
      mostrarModalFinDeJuego()
    
    }
  }, 1000)

}


const seleccionarItem = (e) => {
  let primeraCeldaSeleccionada = document.querySelector(".remarcar")
  //Si ya existe una celda seleccionada
  if (primeraCeldaSeleccionada != null) {
    if (sonAdyacentes(primeraCeldaSeleccionada, e.target)) {
      e.target.classList.add(".segundaCelda")
      intercambiarCeldas(primeraCeldaSeleccionada, e.target)
      obtenerMatches()
    }
    else {
      primeraCeldaSeleccionada.classList.remove("remarcar")
      e.target.classList.add("remarcar")
    }

  }
  // Si no hay ninguna celda seleccionada
  else (
    e.target.classList.add("remarcar")
  )
}
//Devuelve verdadero si dos celdas son adyacentes y falso si no lo

const sonAdyacentes = (celda1, celda2) => {
  const datax1 = Number(celda1.dataset.x)
  const datax2 = Number(celda2.dataset.x)
  const datay1 = Number(celda1.dataset.y)
  const datay2 = Number(celda2.dataset.y)
  if ((datax1 === datax2 && datay1 === datay2 + 1)
    || (datax1 === datax2 && datay1 === datay2 - 1)
    || (datay1 === datay2 && datax1 === datax2 + 1)
    || (datay1 === datay2 && datax1 === datax2 - 1)) {
    return true
  }
  else {
    return false
  }
}



const intercambiarCeldas = (celda1, celda2) => {
  const datax1 = Number(celda1.dataset.x)
  const datax2 = Number(celda2.dataset.x)
  const datay1 = Number(celda1.dataset.y)
  const datay2 = Number(celda2.dataset.y)

  const tamanio = 50

  // aqui modifico la grilla en JS
  let variableTemporal = listaDeAnimales[datax1][datay1]
  listaDeAnimales[datax1][datay1] = listaDeAnimales[datax2][datay2]
  listaDeAnimales[datax2][datay2] = variableTemporal

  // aqui modifico la grilla en HTML

  if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
    celda1.style.left = `${datay2 * tamanio}px`
    celda2.style.left = `${datay1 * tamanio}px`
    celda1.dataset.y = datay2
    celda2.dataset.y = datay1
  }

  else if (datay1 === datay2 && (datax1 === datax2 + 1 || datax1 === datax2 - 1)) {
    celda1.style.top = `${datax2 * tamanio}px`
    celda2.style.top = `${datax1 * tamanio}px`
    celda1.dataset.x = datax2
    celda2.dataset.x = datax1
  }
}

// Obtener Matches y desaparecerlos

const deseleccionarItem = () => {
  let celda = document.querySelector(".remarcar")
  celda.classList.remove("remarcar")
}

const descenderCelda = (celda) => {
  const x = Number(celda.dataset.x)
  const y = Number(celda.dataset.y)
  const tamanio = 50

  // aqui modifico la grilla en JS
  listaDeAnimales[x + 1][y] = listaDeAnimales[x][y]

  //aqui modifico la grilla en HTML
  celda.style.top = `${(x * tamanio) + 50}px`
  celda.dataset.x = x + 1
}


const reacomodarFilas = (matchesHorizontales) => {
  for (let i = 0; i < matchesHorizontales.length; i++) {
    let numeroDeDescensos = matchesHorizontales[i][0]
    
    //Caso en que el match sea en la primera fila
    if(numeroDeDescensos === 0){
        listaDeAnimales[0][matchesHorizontales[i][1]] = obtenerAnimalAlAzar(items)
        let nuevaCelda = generarCelda(0,matchesHorizontales[i][1],listaDeAnimales)
        grilla.appendChild(nuevaCelda)
    }
    
    //agregue k para poder ir moviendo primero los de abajo y despues los de arriba
    let k = numeroDeDescensos
    
    for (let j = 0; j < numeroDeDescensos; j++) {
      
      let celdaADescender = document.querySelector(`div[data-x='${k-1}'][data-y='${matchesHorizontales[i][1]}']`)
      k--

      descenderCelda(celdaADescender)

      if(k<=0){
        listaDeAnimales[0][matchesHorizontales[i][1]] = obtenerAnimalAlAzar(items)
        let nuevaCelda = generarCelda(0,matchesHorizontales[i][1],listaDeAnimales)
        grilla.appendChild(nuevaCelda)
      }
    }
  }
}


const reacomodarColumnas = () => { }

const obtenerMatches = () => {

  let matchesHorizontales = [];
  let matchesVerticales = [];
  let matchesAcumuladosHorizontales = 0
  let matchesAcumuladosVerticales = 0

  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {

      let primera = document.querySelector(".segundaCelda")
      let segunda = document.querySelector(".remarcar")

      if (listaDeAnimales[i][j] === listaDeAnimales[i][j + 1] && listaDeAnimales[i][j] === listaDeAnimales[i][j + 2]) {

        matchesHorizontales.push([i, j])
        matchesHorizontales.push([i, j + 1])
        matchesHorizontales.push([i, j + 2])

        matchesAcumuladosHorizontales += 1
      }

    // else {
    //   intercambiarCeldas(primera,segunda)
    // }


      if (listaDeAnimales[i + 1] && listaDeAnimales[i + 2] && listaDeAnimales[i][j] === listaDeAnimales[i + 1][j] && listaDeAnimales[i + 1][j] === listaDeAnimales[i + 2][j]) {

        matchesVerticales.push([i, j])
        matchesVerticales.push([i + 1, j])
        matchesVerticales.push([i + 2, j])

        matchesAcumuladosVerticales += 1
      }  

      // else {
      //   intercambiarCeldas(primera,segunda)
      // }

    }
  }


  const obtenerCuadrado = (arr) => {
    return document.querySelector(`div[data-x='${arr[0]}'][data-y='${arr[1]}']`)
  }

  const desaparecerAnimal = (celda) => {
    celda.innerHTML = ""
  }

  for (let i = 0; i < matchesHorizontales.length; i++) {
    const celda = obtenerCuadrado(matchesHorizontales[i])
    desaparecerAnimal(celda)
  }
  for (let i = 0; i < matchesVerticales.length; i++) {
    const celda = obtenerCuadrado(matchesVerticales[i])
    desaparecerAnimal(celda)
  }

  const puntosTotales = () => {
    let puntajeVertical = 0
    let puntajeHorizontal = 0

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
  deseleccionarItem()
  reacomodarFilas(matchesHorizontales)
  // reacomodarFilas(matchesVerticales)
}

const inicializarContador = () => {
  puntajeVertical = 0
  puntajeHorizontal = 0
  return puntaje.innerHTML = puntajeVertical + puntajeHorizontal
}


const mostrarModalFinDeJuego = () => {
  modalFinDeJuego.classList.remove("hidden")
  overlay.classList.remove('hidden')
}

// const obtenerMatchesVerticales = () => {

/*
// const obtenerMatchesVerticales = () => {
//   for (let i = 0; i < listaDeAnimales.length; i++) {
//     for (let j = 0; j < listaDeAnimales[i]; j++) {
//             // const primerCeldaVertical = document.querySelector(`div[data-x = '${i}'][data-y = '${j}']`)
//             // const segundaCeldaVertical = document.querySelector(`div[data-x = '${i+1}'][data-y = '${j}']`)
//             // const tercerCeldaVertical = document.querySelector(`div[data-x = '${i+2}'][data-y = '${j}']`)
//             // primerCeldaVertical.style.backgroundcolor ='#5454f1'
//             // segundaCeldaVertical.style.backgroundcolor ='#5454f1'
//             // tercerCeldaVertical.style.backgroundcolor ='#5454f1'
//       }
//     }
//   }
// }
// const ocultarBotones = () => {
//     botonFacil.classList.add("ocultar");
//     botonMedio.classList.add("ocultar");
//     botonDificil.classList.add("ocultar");
// };
// botonFacil.onclick = () => {
//     crearGrilla(6, 6);
//     ocultarBotones();
//     reiniciarJuego.classList.add("facil");
// };
// botonMedio.onclick = () => {
//     crearGrilla(8, 8);
//     ocultarBotones();
//     reiniciarJuego.classList.add("medio");
// };
// botonDificil.onclick = () => {
//     crearGrilla(10, 10);
//     ocultarBotones();
//     reiniciarJuego.classList.add("dificil");
// };
// nuevoJuego.onclick = () => {
//     botonFacil.classList.toggle("ocultar");
//     botonMedio.classList.toggle("ocultar");
//     botonDificil.classList.toggle("ocultar");
//     reiniciarJuego.classList.remove("facil");
//     reiniciarJuego.classList.remove("medio");
//     reiniciarJuego.classList.remove("dificil");
// };
// reiniciarJuego.onclick = () => {
//   if (reiniciarJuego.classList.contains("facil")) {
//     crearGrilla(6, 6);
//   } else if (reiniciarJuego.classList.contains("medio")) {
//     crearGrilla(8, 8);
//   } else if (reiniciarJuego.classList.contains("dificil")) {
//     crearGrilla(10, 10);
//   }
// }
}
*/