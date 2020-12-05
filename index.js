const overlay = document.getElementById('bienvenida')
const modalBienvenida = document.getElementById('modal-inicial')
const botonBienvenida = document.getElementById('boton-bienvenida')
const modalFinDeJuego = document.getElementById('fin-de-juego')
const parrafoSegundos = document.getElementById("segundos")
const botonBuscarMatches = document.getElementById ("buscar-matches")



const grilla = document.querySelector(".grilla");
// const botonFacil = document.getElementById("facil");
// const botonMedio = document.getElementById("medio");
// const botonDificil = document.getElementById("dificil");
const nuevoJuego = document.getElementById("nuevo-juego");
// const reiniciarJuego = document.getElementById("reiniciar-juego");

const botonInfo = document.querySelector(".info")
const botonReiniciar = document.querySelector(".reiniciar")


botonInfo.onclick = () => {
  modalBienvenida.classList.remove('hidden')
  overlay.classList.remove('hidden')
  iniciarJuego();
}

botonReiniciar.onclick = () => {
  iniciarJuego();
  comenzarCuentaRegresiva(limiteDeTiempo);
}



// Grilla

let items = ["🐷", "🐹", "🦊", "🐶", "🐴", "🐔", "🐷", "🐸", "🐤", "🐱"];  
let listaDeAnimales = [];

let animales = "";
let matches =[]

const obtenerNumeroAlAzar = (items) => {
  let largo = items.length;
  return Math.floor(Math.random() * largo);
};
const obtenerAnimalAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)];
};

const crearGrilla = (ancho, alto) => {

  console.log (listaDeAnimales)
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
  for (let i=0; i <listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      if (listaDeAnimales[i][j] === listaDeAnimales[i][j+1] && listaDeAnimales[i][j] === listaDeAnimales[i][j+2]){
        return true
      }

      if (listaDeAnimales[i] && listaDeAnimales[i+1] && listaDeAnimales [i+2] && 
        listaDeAnimales[i+1][j] && listaDeAnimales[i+2][j] && listaDeAnimales[i][j] === listaDeAnimales[i+1][j] && listaDeAnimales[i+1][j]  === listaDeAnimales [i+2][j] ) {
        return true
      }
    }
  }
  return false
}






const generarCelda = (x, y, array) => {
  const tamanio = 50

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
  const anchoDeGrilla = 50 * ancho
  grilla.style.width = `${anchoDeGrilla}px`
  grilla.innerHTML = ""
  for (let i = 0; i < listaDeAnimales.length; i++) {
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      grilla.appendChild(generarCelda(i, j, listaDeAnimales))
    }
  }
}

const iniciarJuego = () => {

  do {
    listaDeAnimales = crearGrilla (6,6)
  }
  while 
   ( buscarMatchesInicial() === true){
  
   }
  agregarGrillaAHTML(6)
  parrafoSegundos.textContent= "0 : 30"
  let limiteDeTiempo = new Date()
  limiteDeTiempo.setSeconds(limiteDeTiempo.getSeconds()+30)

  comenzarCuentaRegresiva(limiteDeTiempo)
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

const mostrarModalFinDeJuego = () => {
  modalFinDeJuego.classList.remove("hidden")
  overlay.classList.remove('hidden')

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

const comenzarCuentaRegresiva=(limiteDeTiempo)=>{
//setInterval ejecuta una función (esta funcion obtiene el tiempo restante en cada 
//momento y lo inserta en el p) o un fragmento de código de forma repetitiva 
//cada vez que termina el periodo de tiempo determinado (1000 milisegundos).
  const actualizadorDeTiempo = setInterval(()=>{

    let segundos=obtenerTiempoFaltante(limiteDeTiempo)
    parrafoSegundos.textContent= "0 : " + segundos
    

    if(segundos==="00"){
      //clearInterval cancela una acción reiterativa que se inició mediante una llamada a setInterval.
      //(actualizadorDeTiempo) es el identificador de la acción reiterativa que se desea cancelar.
      clearInterval(actualizadorDeTiempo)
      mostrarModalFinDeJuego()
    }

  },1000)

}


const seleccionarItem = (e) => {
  let primeraCeldaSeleccionada = document.querySelector(".remarcar")
  //Si ya existe una celda seleccionada
  if (primeraCeldaSeleccionada != null) {
    if (sonAdyacentes(primeraCeldaSeleccionada, e.target)) {
      intercambiarCeldas(primeraCeldaSeleccionada, e.target)
    }
    else {
      primeraCeldaSeleccionada.classList.remove("remarcar")
      e.target.classList.add("remarcar")
    }

  }
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

// ==================>>>> RECORRO MATCHES Y LES ASIGNO COLOR.



const obtenerMatches = () => {

  
let matchesHorizontales = [];
let matchesVerticales = [];

console.log(listaDeAnimales)


  for (let i = 0; i < listaDeAnimales.length; i++) {
    console.log ("fgjkndgkj")
    for (let j = 0; j < listaDeAnimales[i].length; j++) {
      console.log ("segundo for")
      if (listaDeAnimales[i][j] === listaDeAnimales[i][j+1] && listaDeAnimales[i][j] === listaDeAnimales[i][j+2]) {
console.log ("gf")
        matchesHorizontales.push([i, j])
        matchesHorizontales.push([i, j+1])
        matchesHorizontales.push([i, j+2])
      
      }

        if (listaDeAnimales[i + 1] && listaDeAnimales[i + 2] && listaDeAnimales[i][j] === listaDeAnimales [i + 1][j] && listaDeAnimales [i + 1][j] === listaDeAnimales [i+2][j] ) {
          console.log ("hggfhf")
          matchesVerticales.push([i, j])
          matchesVerticales.push([i+1, j])
          matchesVerticales.push([i+2, j])      
      
        }
        
    }
   
  }
  

    const obtenerCuadrado = (arr) => {
      return document.querySelector(`div[data-x='${arr[0]}'][data-y='${arr[1]}']`)
    }
  
  
    const colorearCelda = (celda, color ) => {
      celda.style.backgroundColor = color
      console.log ("colorearCelda")
    }

    console.log (matchesHorizontales)
    console.log (matchesVerticales)
  
    for (let i = 0; i < matchesHorizontales.length; i++) {
      console.log ("for del match horizontal")
      const celda = obtenerCuadrado(matchesHorizontales[i]) 
      colorearCelda(celda, "yellow")
    }
    for (let i = 0; i < matchesVerticales.length; i++) {
      const celda = obtenerCuadrado(matchesVerticales[i]) 
      colorearCelda(celda, "orange")
      
    }

  }



botonBuscarMatches.onclick = () => {
  console.log ("boton")
  obtenerMatches()
  
  
}

 

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
//     if (reiniciarJuego.classList.contains("facil")) {
//       crearGrilla(6, 6);
//     } else if (reiniciarJuego.classList.contains("medio")) {
//       crearGrilla(8, 8);
//     } else if (reiniciarJuego.classList.contains("dificil")) {
//       crearGrilla(10, 10);
//     }
// };


