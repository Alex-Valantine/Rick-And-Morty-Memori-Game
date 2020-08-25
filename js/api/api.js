const API = 'https://rickandmortyapi.com/api';

/* Coges 10 ids random y haces la petición con eso, cada vez que haces una
petición llegan personajes distintos. Los ids tienen que estar entre 1 y 591, si
vas a 'https://rickandmortyapi.com/api/character' ves que el count es 591.
Puedes pedir un número concreto de personajes añadiendo los id.

Hay que prevenir que los ids no se repitan, porque si se repite uno obtienes 9
personajes en vez de 10 y te la lía, por eso uso un Set, que no permite
repetidos. */

const fetchCharacters = async () => {
  const ids = new Set();
  while (ids.size < 10) {
    ids.add(Math.round(Math.random() * 590) + 1);
  }

  try {
    const res = await fetch(`${API}/character/${Array.from(ids).toString()}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export { fetchCharacters };