import { Config } from "../utils/Config.js";
import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";

/**
 * Dibuja el sprite de un Pokémon en la pantalla del juego.
 * @param {object} pokemon - Objeto que representa un Pokémon, que incluye atributos como `enemy`, `mega`, `shiny`, e `id`.
 */
export function DrawPokemonSprite(pokemon) {
  const screen = new Screen(".game-canvas"); // Crea una instancia de la clase Screen, asociada al lienzo del juego.
  const isEnemy = pokemon.enemy; // Determina si el Pokémon es un enemigo.

  // Obtiene la posición de dibujo del Pokémon basada en si es un enemigo o un aliado.
  const pos = isEnemy
    ? Config.EnemyPokemonPosition
    : Config.AllayPokemonPosition;

  // Obtiene la ruta al sprite del Pokémon.
  var path = GetPokemonSprite(pokemon);

  // Dibuja el sprite en la pantalla en la posición correspondiente.
  new Sprite(path, screen, pos.x, pos.y);
}

/**
 * Devuelve la ruta del sprite del Pokémon, considerando su estado (enemigo, mega, shiny).
 * @param {object} pokemon - Objeto que representa un Pokémon.
 * @returns {string} - Ruta al archivo de imagen del sprite.
 */
function GetPokemonSprite(pokemon) {
  const isEnemy = pokemon.enemy; // Determina si el Pokémon es un enemigo.
  var normal = "assets/sprites/pokemons/"; // Ruta base para sprites normales.
  var mega = "assets/sprites/pokemons/megas/"; // Ruta base para sprites de Pokémon megaevolucionados.

  // Selecciona la ruta base dependiendo de si el Pokémon es megaevolucionado o no.
  var path = pokemon.mega ? mega : normal;
  var pokemonSprite = pokemon.id + ".png"; // Nombre del archivo de sprite basado en el ID del Pokémon.

  // Agrega la subcarpeta específica dependiendo de si es enemigo o aliado y si es shiny.
  path += isEnemy
    ? pokemon.shiny
      ? "frontal_shiny/"
      : "frontal/"
    : pokemon.shiny
    ? "back_shiny/"
    : "back/";

  // Devuelve la ruta completa al archivo de sprite.
  return path + pokemonSprite;
}
