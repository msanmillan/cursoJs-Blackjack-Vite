/**
 * Función que se encarga de determinar la puntuación de la carta.
 * @param {string} carta 
 * @returns {number} El valor de la carta
 */
export const valorarCarta = (carta) => {
    const valorNumerico = carta.substring(0, carta.length - 1);

    return (isNaN(valorNumerico) ?
        (valorNumerico === 'A' ? 11 : 10)
        : valorNumerico * 1);
}