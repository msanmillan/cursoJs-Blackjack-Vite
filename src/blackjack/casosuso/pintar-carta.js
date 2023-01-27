  /* funcion que se encarga de la impresion de cartas en el tablero.*/

  /**
   * 
   * @param {string} carta 
   * @returns la imagen de la carta. 
   */
  export const pintarCarta = (carta) =>{
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    return imgCarta;
}