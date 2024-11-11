import { Config } from "../utils/Config.js";
import { Random, RandomRange } from "../utils/Data.js";
import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";

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

  var sprite = new Sprite(path, screen, pos.x, pos.y);
  sprite.screen.ctx.translate(pos.x, pos.y);
  sprite.screen.ctx.imageSmoothingEnabled = false;

  // Dibuja el sprite en la pantalla en la posición correspondiente.
  return sprite;
}

// Posición inicial de la imagen.
let x = 0;
const amplitude = 5; // Amplitud de la onda (altura de la oscilación).
const frequency = 0.005; // Frecuencia de la onda (controla la longitud de la onda).

// Velocidad de movimiento en el eje X.
let speed = 2;

export function AnimatePokemon(pokemonSprite) {
  const ctx = pokemonSprite.screen.ctx;

  // Limpiamos el canvas.
  ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);

  // Calculamos la posición en el eje Y usando la función seno.
  const y =
    -amplitude * Math.sin(pokemonSprite.y * pokemonSprite.x + frequency * x);
  const angle =
    0.0002 * Math.sin(pokemonSprite.y * pokemonSprite.x + frequency * x); // 45 grados
  ctx.rotate(angle);

  // Dibujamos la imagen en la posición actual.
  ctx.drawImage(pokemonSprite.image, 0, y);

  // Actualizamos la posición en el eje X.
  // Verificamos si la imagen sale del canvas y la reiniciamos.
  x += speed;

  // Llamamos a requestAnimationFrame para la siguiente actualización.
  requestAnimationFrame(() => AnimatePokemon(pokemonSprite));
}

let AppearFrames = 0;

export function AppearPokemon(pokemonSprite, pokemon) {
  const ctx = pokemonSprite.screen.ctx;
  ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);

  AppearSound();

  function AppearSound() {
    const sound = document.getElementById(pokemon.enemy ? "enemy" : "allay");
    sound.src = `../assets/music/appears/${pokemon.id}.ogg`; // Establece la fuente de audio (`src`) al valor de `Data.Music`.
    sound.play();
  }

  function animate() {
    ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);

    // Asegúrate de que no se pase de los 2 segundos de animación
    if (AppearFrames < 0.5 * 60) {
      // 2 segundos = 120 cuadros si el frameRate es 60fps
      const y =
        2 * Math.sin(pokemonSprite.y * pokemonSprite.x + 100 * AppearFrames);

      // Dibujamos la imagen en la posición actual.
      ctx.drawImage(pokemonSprite.image, 0, y);

      // Actualizamos el contador de frames
      AppearFrames++;

      // Llamamos a requestAnimationFrame para la siguiente actualización
      requestAnimationFrame(() => animate());
    } else {
      // Cuando los 2 segundos hayan pasado, se reinicia la animación
      AppearFrames = 0;
      requestAnimationFrame(() => AnimatePokemon(pokemonSprite)); // Llama a la siguiente fase de animación
    }
  }

  animate(); // Inicia la animación
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
  console.log(pokemon.name);
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
