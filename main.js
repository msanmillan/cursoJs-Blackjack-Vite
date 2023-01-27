import './style.css'
import _ from "underscore";

/* Sintaxis patrón modulo */
/**
 * (() =>{
 *      EL CODIGO A EJECUTAR
 * })();
 */

/*Funcion anónima autoinvocada. 
Los objetos ya no pueden ser llamados desde consola puesto que no se sabe donde está su referencia a memoria
*/
const miModulo = (() => {
  'use strict'

  let deck = [];
  const cartasNoNumericas = ['A', 'J', 'Q', 'K'];
  const tipos = ['C', 'D', 'H', 'S'];
  let puntosJugador = 0;
  let puntosMaquina = 0;
  let puntosParticipantes = [];

  /**************************************************Referencias del DOM************************************************ */
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnPedir = document.querySelector("#btnPedir");
  const btnPlantar = document.querySelector("#btnPlantar");
  const cajonPuntosJgdr = document.querySelectorAll('small')[0];
  const cajonPuntosMaquina = document.querySelectorAll('small')[1];
  const divJugadorCartas = document.querySelectorAll('.divCartas');
  const divMaquinaCartas = document.querySelector('#maquina-cartas');

  /**********************************************************Funciones************************************************ */
  /* Funcion que inicializa el juego */
  const inicializarJuego = (numJugadores= 1) =>{
      deck = crearDeck();
      
      for (let i = 0; i<numJugadores;i++){
          divJugadorCartas[i].innerHTML = '';
      }
      divMaquinaCartas.innerHTML = '';
      
      puntosParticipantes = [];
      numJugadores++ //Incrementamos 1 para la maquina o la banca
      for (let i = 0; i<numJugadores;i++){
          puntosParticipantes.push(0);    
      }
     
      btnPedir.disabled = false;
      btnPlantar.disabled = false;
      puntosJugador = 0;
      puntosMaquina = 0;
      cajonPuntosJgdr.innerText = 0;
      cajonPuntosMaquina.innerText = 0;
  }

  /* Funcion que se encarga de crear una baraja */
  const crearDeck = () => {
      deck = [];
      for (let i = 2; i <= 10; i++) {
          tipos.forEach(palo => {
              deck.push(i + palo);
          });
      }
      cartasNoNumericas.forEach(carta => {
          tipos.forEach(palo => {
              deck.push(carta + palo);
          });
      });

      return barajear();
  }

  /* Funcion que se encarga de mover aleatoriamente los elementos del array */
  const barajear = () => {
      return _.shuffle(deck);
  }

  /* Funcion que se encarga de solicitar una carta. */
  const pedirCarta = () => {

      if (deck.length === 0) {
          throw ("No hay cartas en el deck");
      }
  
      return deck.pop();
  }

  /* Función que se encarga de determinar el valor de la carta recibida */
  const valorarCarta = (carta) => {
      const valorNumerico = carta.substring(0, carta.length - 1);

      return (isNaN(valorNumerico) ?
          (valorNumerico === 'A' ? 11 : 10)
          : valorNumerico * 1);
  }
  
  /* Funcion que se encarga de la acumulación de los puntos del jugador respectivo.
  turno 0--> Primer jugador
  turno final --> Turno de la banca.*/
  const acumulaPuntos = (carta,turno) =>{
      puntosParticipantes[turno]+=valorarCarta(carta);
      if(turno===puntosParticipantes.length-1){
          cajonPuntosMaquina.innerText=puntosParticipantes[turno];   
      }
      else{
          cajonPuntosJgdr.innerText=puntosParticipantes[turno];
      }
      
      return puntosParticipantes[turno];
      
  }
  /* funcion que se encarga de la impresion de cartas en el tablero.*/
  const pintarCarta = (carta,turno) =>{
      const imgCarta = document.createElement('img');
      imgCarta.src = `./assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
      if(turno === puntosParticipantes.length-1){
          divMaquinaCartas.append(imgCarta);
      }else{
          divJugadorCartas[turno].append(imgCarta);
      }
  }

  /* Funcion que se encarga del turno de la máquina.
      Su objetivo es empatar o ganar al usuario.
   */
  const juegoMaquina = () => {
      do {

          const carta = pedirCarta();
          puntosMaquina = acumulaPuntos(carta,puntosParticipantes.length-1);
          pintarCarta(carta,puntosParticipantes.length-1);
          
      } while (puntosMaquina < puntosJugador && puntosMaquina <= 21 && puntosJugador <= 21);

  }
  /* Funcion que se encarga de determinar quien ha ganado el juego.*/
  const valuarGanador = () => {
      if (puntosJugador > 21) {
          alert("Jugador pierde");
      }
      else if (puntosJugador <= 21 && puntosMaquina > 21) {
          alert("Jugador gana");
      }
      else if (puntosJugador <= 21 && puntosMaquina < puntosJugador) {
          alert("Jugador gana");
      }
      else if (puntosJugador <= 21 && puntosMaquina > puntosJugador) {
          alert("Jugador pierde");
      }
      else {
          alert("Empate");
      }
  }

  /**********************************************************Eventos************************************************ */
  btnPedir.addEventListener('click', () => {
      const carta = pedirCarta();
      puntosJugador = acumulaPuntos(carta,0);
      pintarCarta(carta,0)

      if (puntosJugador > 21) {
          btnPlantar.disabled = true;
          btnPedir.disabled = true;
          juegoMaquina();
          setTimeout(() => {
              valuarGanador();
          }, 500);
      }
      else if (puntosJugador === 21) {
          btnPedir.disabled = true;
          btnPlantar.disabled = true;
          juegoMaquina();
          setTimeout(() => {
              valuarGanador();
          }, 500);
      }
  });

  btnPlantar.addEventListener('click', () => {
      console.log("Plantado con", puntosJugador, "puntos");
      btnPedir.disabled = true;
      btnPlantar.disabled = true;
      juegoMaquina();
      setTimeout(() => {
          valuarGanador();
      }, 500);
  });

  btnNuevo.addEventListener('click', () => {
      inicializarJuego();
  });

  //Lo que retornemos será lo unico visible desde fuera.
  return {
      nuevoJuego: inicializarJuego
  };
})();
