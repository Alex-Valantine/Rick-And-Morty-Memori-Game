import { fetchCharacters } from '../api/api.js';
import { shuffle } from '../lib/shuffle.js';
import Timer from './timer.js';

/**
 * Clase principal que lleva la lógica del juego.
 */
export default class Game {
  constructor() {
    this.cards = [];
    this.selected = [];
    this.moves = 0;
    this.matched = 0;
    this.timer = new Timer(document.getElementById('tiempo'));
  }

  /**
   * Rota la carta en una dirección u otra, según cómo está.
   *
   * @param {HTMLElement} card
   */
  toggleRotation(card) {
    if (!card.classList.contains('rotar')) {
      return card.classList.add('rotar');
    }
    setTimeout(() => {
      card.classList.remove('rotar');
    }, 1000);
  }

  /**
   * Actualiza el estado del juego según la carta seleccionada.
   *
   * @param {MouseEvent} e
   */
  selectCard = (e) => {
    if (this.moves == 0) {
      this.timer.start();
    }

    const card = e.target;
    card.removeEventListener('click', this.selectCard);
    this.toggleRotation(card);

    this.selected.push(card);
    if (this.selected.length == 1) {
      return;
    }

    if (
      this.selected[0].getAttribute('id') ===
      this.selected[1].getAttribute('id')
    ) {
      this.matched++;
    } else {
      this.selected.forEach((card) => {
        this.toggleRotation(card);
        card.addEventListener('click', this.selectCard);
      });
    }

    this.selected = [];
    if (this.matched === 10) {
      this.win();
    }
  };

  /**
   * Añade los event listeners a las cartas.
   */
  addCardListeners() {
    const movesDiv = document.getElementById('movimientos');

    this.cards.forEach((card) => {
      card.addEventListener('click', this.selectCard);
      card.addEventListener('click', () => {
        movesDiv.innerHTML = `Movimientos: ${++this.moves}`;
      });
    });
  }

  /**
   * Coge los datos del API y rellena las cartas con los personajes.
   */
  async fillCards() {
    try {
      const characters = await fetchCharacters();

      this.cards = shuffle([...characters, ...characters]).map((character) => {
        const div = document.createElement('div');
        div.setAttribute('id', character.id);
        div.classList.add('tarjeta');

        div.innerHTML = `
          <div class="front vueltaFront"></div>
          <div
            class="back vueltaBack"
            style="background-image: url(${character.image})"
          >
          </div>
        `;

        return div;
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Muestra una alerta en el DOM con la victoria.
   */
  win() {
    this.timer.stop();
    swal(
      'Ganaste!',
      `Movimientos: ${this.moves} \n\n Tiempo: ${this.timer.toString()}`,
      'success'
    );
  }

  /**
   * Arranca el juego.
   */
  async start() {
    try {
      await this.fillCards();
      this.addCardListeners();
      const gameContainer = document.getElementById('game');
      this.cards.forEach((card) => gameContainer.appendChild(card));

      document.getElementById('new-game').addEventListener('click', () =>
        location.reload()
      );
      document.getElementById('cargando').style.display = 'none';
      document.getElementById('game').style.display = 'flex';
    } catch (err) {
      swal('Error...', err.message, 'error');
    }
  }
}
