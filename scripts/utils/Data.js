/**
 * La clase `Data` sirve como un contenedor para almacenar y gestionar datos relacionados con el juego,
 * como la información de los Pokémon, los movimientos y la música. Las propiedades de la clase son
 * estáticas para permitir un acceso global sin necesidad de instanciar la clase.
 */
export class Data {
  // Almacena los datos de los Pokémon, como sus atributos y estadísticas.
  static PokemonData;

  // Almacena la información sobre los movimientos (ataques) disponibles en el juego.
  static MovesData;

  // Contiene las referencias a los datos de la música o banda sonora del juego.
  static Music;

  static ActualPokemon;
}

/**
 * Genera un número entero aleatorio entre 0 (inclusive) y un valor `i` (exclusivo).
 * @param {number} i - El límite superior (exclusivo) para el número aleatorio.
 * @returns {number} Un número entero aleatorio entre 0 y `i - 1`.
 */
export function RandomZeroTo(i) {
  return Math.floor(Math.random() * i);
}

/**
 * Genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo).
 * @returns {number} Un número decimal aleatorio.
 */
export function Random() {
  return Math.random();
}

/**
 * Genera un número entero aleatorio dentro de un rango especificado.
 * @param {number} min - El valor mínimo (inclusive).
 * @param {number} max - El valor máximo (inclusive).
 * @returns {number} Un número entero aleatorio entre `min` y `max`.
 */
export function RandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
