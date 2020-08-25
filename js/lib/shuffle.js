// Algoritmo para ordenar de forma aleatoria un array, lo he encontrado aquí:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

/**
 * Desordena un array de forma aleatoria.
 *
 * @param {any[]} array
 * @returns {any[]} Array desordenado.
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export { shuffle };
