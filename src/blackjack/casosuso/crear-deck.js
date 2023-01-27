import _ from "underscore";

/**
 * /**
 * Funcion que se encarga de crear una baraja 
 * @param {string[]} tipos - Los palos de la baraja
 * @param {string[]} cartasNoNumericas - Las cartas no numericas
 * @returns {string[]} - La baraja mezclada
 */
export const crearDeck = (tipos,cartasNoNumericas) => {

    if(!tipos || tipos.length === 0){
        throw new Error ("Necesario enviar los tipos de carta ['C' 'D' 'H' 'S']");
    }
    if(!cartasNoNumericas || cartasNoNumericas.length === 0){
        throw new Error ("Necesario enviar las cartas no numericas ['A' 'J' 'Q' 'K']");
    }
    
    let deck = [];
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

    return barajear(deck);
};

/* Funcion que se encarga de mover aleatoriamente los elementos del array */
const barajear = (deck) => {
    return _.shuffle(deck);
};

