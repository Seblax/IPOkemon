import { Move } from "../Moves/Move.js";
import { Pokemon } from "../Pokemon.js";
import { Random, RandomRange } from "./Data.js";

/**
 * Función `Parser` que se encarga de cargar y procesar archivos CSV.
 * @param {string} path - Ruta del archivo CSV a procesar.
 * @returns {Promise<Array<string[]>>} - Una promesa que resuelve con un array de arrays, donde cada subarray representa una fila con los valores de las celdas.
 */
export async function Parser(path) {
  const response = await fetch(path); // Realiza una solicitud para obtener el contenido del archivo CSV.
  const csvData = await response.text(); // Convierte la respuesta en texto plano.

  const rows = csvData.split("\n"); // Divide el contenido en filas, separadas por saltos de línea.

  // Procesa y devuelve las filas del CSV como arrays de valores, omitiendo la primera fila (encabezados).
  return rows.slice(1).map((row) => {
    const values = row.trim().split(";"); // Divide cada fila en valores individuales usando ';' como separador.
    return values; // Retorna el array de valores de la fila.
  });
}

/**
 * Carga y crea objetos de tipo `Pokemon` a partir de un archivo CSV específico.
 * @returns {Promise<Pokemon[]>} - Una promesa que resuelve con un array de instancias de `Pokemon`.
 */
export async function loadPokemonFromCSV() {
  var pokemons = await Parser("../data/pokemon_data.csv"); // Llama al parser para obtener los datos.

  return pokemons.map((values) => {
    // Crea una nueva instancia de `Pokemon` usando los valores extraídos del CSV.
    return new Pokemon(
      values[0], // Nombre
      values[1], // Tipo principal
      values[2], // Tipo secundario
      values[3], // HP
      values[4], // Ataque
      values[5], // Defensa
      values[6], // Ataque especial
      values[7], // Defensa especial
      values[8], // Velocidad
      values[9], // Nivel de experiencia
      values[10], // Nivel de evolución
      values[11], // Habilidad
      values[12], // Movimientos aprendidos
      isMega(values[1]), // Determina si es una versión "Mega".
      false, // Indica si es enemigo (por defecto, `false`).
      Random() < 0.002, // Determina si es "Shiny" con una baja probabilidad.
      [], // Movimientos personalizados (array vacío).
      RandomRange(80, 90) + 10 // Rango de nivel inicial.
    );
  });
}

/**
 * Verifica si el nombre del Pokémon indica que es una versión "Mega".
 * @param {string} name - Nombre del Pokémon.
 * @returns {boolean} - `true` si el nombre contiene "Mega" (pero no al principio o al final), de lo contrario `false`.
 */
function isMega(name) {
  const regex = /(?<!^)Mega(?!$)/i; // Expresión regular para buscar "Mega" no al inicio ni al final del nombre.
  return regex.test(name);
}

/**
 * Carga y crea objetos de tipo `Move` a partir de un archivo CSV específico.
 * @returns {Promise<Move[]>} - Una promesa que resuelve con un array de instancias de `Move`.
 */
export async function loadMovesFromCSV() {
  var moves = await Parser("../data/pokemon_moves_data.csv"); // Llama al parser para obtener los datos.

  return moves.map((values) => {
    // Crea una nueva instancia de `Move` usando los valores extraídos del CSV.
    return new Move(
      values[0], // Nombre del movimiento
      values[1], // Tipo de movimiento
      values[2], // Poder
      values[3], // Precisión
      values[4], // PP (Puntos de Poder)
      values[5], // Prioridad
      values[6]  // Efecto
    );
  });
}
