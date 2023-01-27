
  /**
   * Funcion que se encarga de determinar quien ha ganado el juego.
   * @param {number} puntosJugador 
   * @param {number} puntosMaquina 
   */
  export const valuarGanador = (puntosJugador,puntosMaquina) => {
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