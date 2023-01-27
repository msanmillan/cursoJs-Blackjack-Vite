/* Funcion que se encarga de la acumulación de los puntos del jugador respectivo.
turno 0--> Primer jugador
turno final --> Turno de la banca.*/

import { valorarCarta } from "./valor-carta";

/**
 * 
 * @param {string[]} puntosParticipantes 
 * @param {*} cajonPuntosMaquina 
 * @param {*} cajonPuntosJgdr 
 * @param {string} carta 
 * @param {number} turno 
 * @returns {number} Los puntos del usuario.
 */
export const acumulaPuntos = (puntosParticipantes, cajonPuntosMaquina, cajonPuntosJgdr,carta, turno) => {
    puntosParticipantes[turno] += valorarCarta(carta);
    if (turno === puntosParticipantes.length - 1) {
        cajonPuntosMaquina.innerText = puntosParticipantes[turno];
    }
    else {
        cajonPuntosJgdr.innerText = puntosParticipantes[turno];
    }

    return puntosParticipantes[turno];

}