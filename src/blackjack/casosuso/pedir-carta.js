

/**
 * Funcion que se encarga de solicitar una carta.
 * @param {string[]} deck 
 * @returns {string} - La carta sacada.
 */
export const pedirCarta = (deck) => {

    if (deck.length === 0 || !deck) {
        throw new Error("No hay cartas en el deck");
    }

    return deck.pop();
}