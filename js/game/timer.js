/**
 * Implementación simple de un temporizador.
 */
export default class Timer {
  /**
   * Coloca el temporizador dentro del elemento del DOM recibido.
   *
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.timer = root;
    this.interval = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  /**
   * Suma segundos al temporizador.
   *
   * @param {int} seconds
   */
  add(seconds) {
    this.seconds += seconds;
    if (this.seconds >= 60) {
      this.minutes++;
      this.seconds = this.seconds - 60;
    }
  }

  /**
   * Añade un cero cabecera si es necesario.
   *
   * @param {number} t
   * @returns {string} Cadena formateada.
   */
  formatTime(t) {
    return t < 10 ? `0${t}` : `${t}`;
  }

  /**
   * Pasa este objeto a cadena.
   *
   * @returns {string} Este objeto.
   */
  toString() {
    return `${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`;
  }

  start() {
    this.interval = setInterval(() => {
      this.add(1);
      this.timer.innerHTML = this.toString();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
