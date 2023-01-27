import { acumulaPuntos, crearDeck, pedirCarta, pintarCarta, valuarGanador } from "./casosuso/index.js";

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
    const cartasNoNumericas = ['A', 'J', 'Q', 'K'];
    const tipos = ['C', 'D', 'H', 'S'];
    let deck = [];
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
    /**
     * Funcion que inicializa el juego 
     * @param {number} numJugadores Numero de jugadores. De momento solo 1 jugador se permite
     */
    const inicializarJuego = (numJugadores = 1) => {

        deck = crearDeck(tipos, cartasNoNumericas);

        for (let i = 0; i < numJugadores; i++) {
            divJugadorCartas[i].innerHTML = '';
        }
        divMaquinaCartas.innerHTML = '';

        puntosParticipantes = [];
        numJugadores++ //Incrementamos 1 para la maquina o la banca
        for (let i = 0; i < numJugadores; i++) {
            puntosParticipantes.push(0);
        }

        btnPedir.disabled = false;
        btnPlantar.disabled = false;
        puntosJugador = 0;
        puntosMaquina = 0;
        cajonPuntosJgdr.innerText = 0;
        cajonPuntosMaquina.innerText = 0;
    }

    /**
     * Funcion que se encarga del turno de la máquina. Su objetivo es empatar o ganar al usuario.
     */
    const juegoMaquina = () => {
        do {
            const carta = pedirCarta(deck);
            puntosMaquina = acumulaPuntos(puntosParticipantes, cajonPuntosMaquina, cajonPuntosJgdr, carta, puntosParticipantes.length - 1);
            let imagenCarta = pintarCarta(carta);
            divMaquinaCartas.append(imagenCarta);

        } while (puntosMaquina < puntosJugador && puntosMaquina <= 21 && puntosJugador <= 21);

    }

    /**********************************************************Eventos************************************************ */
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        puntosJugador = acumulaPuntos(puntosParticipantes, cajonPuntosMaquina, cajonPuntosJgdr, carta, 0);
        let imagenCarta = pintarCarta(carta);
        divJugadorCartas[0].append(imagenCarta);

        if (puntosJugador > 21) {
            btnPlantar.disabled = true;
            btnPedir.disabled = true;
            juegoMaquina();
            setTimeout(() => {
                valuarGanador(puntosJugador, puntosMaquina);
            }, 500);
        }
        else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnPlantar.disabled = true;
            juegoMaquina();
            setTimeout(() => {
                valuarGanador(puntosJugador, puntosMaquina);
            }, 500);
        }
    });

    btnPlantar.addEventListener('click', () => {
        console.log("Plantado con", puntosJugador, "puntos");
        btnPedir.disabled = true;
        btnPlantar.disabled = true;
        juegoMaquina();
        setTimeout(() => {
            valuarGanador(puntosJugador, puntosMaquina);
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
