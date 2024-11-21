import { Config } from "../utils/Config.js";
import { PokemonSprite } from "../utils/PokemonSprite.js";
import { Screen } from "../utils/Screen.js";
import { PokemonUI } from "./PokemonUI.js";

const SpecialPokemon = [
  6, //
  // 201,
  351, //
  386, //
  412, //
  422, //
  423, //
  479, //
  487, //
  492, //
  // 493,
  555, //
  585, //
  586, //
  641, //
  642, //
  645, //
  646, //
  647, //
  648,
  649,
];

/**
 * Dibuja el sprite de un Pokémon en la pantalla del juego.
 * @param {object} pokemon - Objeto que representa un Pokémon, que incluye atributos como `enemy`, `mega`, `shiny`, e `id`.
 */
export function DrawPokemonSprite(pokemon) {
  const isEnemy = pokemon.enemy; // Determina si el Pokémon es un enemigo.
  const screen = isEnemy
    ? new Screen(".enemy-canvas")
    : new Screen(".allay-canvas"); // Crea una instancia de la clase Screen, asociada al lienzo del juego.

  // Obtiene la posición de dibujo del Pokémon basada en si es un enemigo o un aliado.
  const pos = isEnemy
    ? Config.EnemyPokemonPosition
    : Config.AllayPokemonPosition;

  // Obtiene la ruta al sprite del Pokémon.
  var path = GetPokemonSprite(pokemon);
  new PokemonSprite(path, screen, pos.x, pos.y, pokemon);
  
  var ui = new PokemonUI(pokemon);
  ui.DrawPokemonUI();
  ui.DrawHpBar(pokemon.totalHp);
  return ui;
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

  if (SpecialPokemon.includes(pokemon.id)) {
    return getSpecialSprite(pokemon);
  }

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

function getSpecialSprite(pokemon) {
  const isEnemy = pokemon.enemy; // Determina si el Pokémon es un enemigo.
  const tag = pokemon.name.split(" ")[1].toLowerCase();
  var path = "assets/sprites/pokemons/specials/"; // Ruta base para sprites normales.

  // Agrega la subcarpeta específica dependiendo de si es enemigo o aliado y si es shiny.
  path += isEnemy
    ? pokemon.shiny
      ? "frontal_shiny/"
      : "frontal/"
    : pokemon.shiny
    ? "back_shiny/"
    : "back/";

  return `${path}${pokemon.id}-${tag}.png`;
}
