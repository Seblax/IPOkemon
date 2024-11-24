import { DrawPokemonSprite } from "./scripts/DrawSprites/DrawPokemonSprites.js";
import { DrawBackground } from "./scripts/DrawSprites/DrawBackGround.js";
import { PokemonTeam } from "./scripts/Pokemons/PokemonTeam.js";
import { Data } from "./scripts/utils/Data.js";
import { Music, SetBattleMusic } from "./scripts/Music.js";
import { DrawMoveSet } from "./scripts/DrawSprites/MoveSetSprites.js";
import { MoveSetButtonsBehavior } from "./scripts/Moves/MovesBehavior.js";
import { loadMovesFromCSV, loadPokemonFromCSV, loadTypesFromCSV } from "./scripts/utils/CSV.js";
import { Test1, Test2, Test3, Test4, Test5 } from "./scripts/Tests/Test.js";

// Inicialización de equipos de Pokémon para los jugadores (aliado y enemigo).
const teamAllay = new PokemonTeam();
const teamEnemy = new PokemonTeam();

// Función principal que inicializa todo el entorno de juego.
Start();

/**
 * Función asíncrona que configura y comienza el juego.
 */
async function Start() {
  await LoadData(); // Carga los datos necesarios desde archivos CSV.
  await GenerateTeams(); // Genera los equipos de Pokémon.

  MoveSetButtonsBehavior(); // Configura el comportamiento de los botones del conjunto de movimientos.

  SetBattleMusic(); // Establece la música de fondo.
  Music(); // Reproduce la música.

  // Inicialización estándar de los Pokémon.
  LoadPokemons();

  // Opcional: Inicialización basada en pruebas específicas.
  // await Test1();  // Prueba de eficacias (x0.25, x0.5, x1, x2, x4).
  // Test2();  // Prueba de eficacia x0.
  // await Test3();  // Prueba de Pokémon shiny y megaevoluciones.
  // await Test4();  // Prueba de velocidades y prioridades de ataque.
  // await Test5();  // Prueba de Pokémon personalizados.

  DrawAll(); // Dibuja el estado inicial del juego.
}

/**
 * Genera un nuevo Pokémon para el equipo enemigo o aliado.
 * @param {boolean} isEnemy - Indica si el Pokémon generado pertenece al enemigo.
 */
export async function GenerateNewPokemon(isEnemy) {
  var team = new PokemonTeam(); // Crea un nuevo equipo temporal.
  await team.generateTeam(isEnemy); // Genera el equipo del lado correspondiente.
  const pokemon = team.team[0]; // Selecciona el primer Pokémon del equipo.

  if (isEnemy) {
    // Configuración para el Pokémon enemigo.
    Data.ActualEnemyPokemon = pokemon;
    const Enemy = DrawPokemonSprite(Data.ActualEnemyPokemon); // Dibuja al Pokémon enemigo.
    Data.UIEnemy = Enemy.UI; // Asocia la interfaz del enemigo.
    Data.PokemonEnemyAnimation = Enemy.Animation; // Configura la animación del enemigo.
  } else {
    // Configuración para el Pokémon aliado.
    Data.ActualAllayPokemon = pokemon;
    const Allay = DrawPokemonSprite(Data.ActualAllayPokemon); // Dibuja al Pokémon aliado.
    Data.UIAllay = Allay.UI; // Asocia la interfaz del aliado.
    Data.PokemonAllayAnimation = Allay.Animation; // Configura la animación del aliado.
    DrawMoveSet(Data.ActualAllayPokemon); // Dibuja el conjunto de movimientos del aliado.
  }
}

/**
 * Carga los datos de Pokémon, movimientos y tipos desde archivos CSV.
 */
async function LoadData() {
  Data.PokemonData = await loadPokemonFromCSV(); // Carga datos de los Pokémon.
  Data.MovesData = await loadMovesFromCSV(); // Carga datos de los movimientos.
  Data.Types = await loadTypesFromCSV(); // Carga datos de los tipos.

  Data.AnimationManager.start(); // Inicia el manejador de animaciones.
  TypeChartButton(); // Configura el botón de acceso a la tabla de tipos.
}

/**
 * Genera equipos de Pokémon para ambos lados.
 */
async function GenerateTeams() {
  await teamAllay.generateTeam(false); // Genera el equipo aliado.
  await teamEnemy.generateTeam(true); // Genera el equipo enemigo.
}

/**
 * Asigna el primer Pokémon de cada equipo como el Pokémon actual.
 */
function LoadPokemons() {
  Data.ActualAllayPokemon = teamAllay.team[0]; // Asigna el primer Pokémon aliado.
  Data.ActualEnemyPokemon = teamEnemy.team[0]; // Asigna el primer Pokémon enemigo.
}

/**
 * Dibuja los elementos visuales iniciales del juego: Pokémon, fondo y movimientos.
 */
function DrawAll() {
  const Allay = DrawPokemonSprite(Data.ActualAllayPokemon); // Dibuja al Pokémon aliado.
  const Enemy = DrawPokemonSprite(Data.ActualEnemyPokemon); // Dibuja al Pokémon enemigo.

  Data.UIAllay = Allay.UI; // Asocia la interfaz del aliado.
  Data.UIEnemy = Enemy.UI; // Asocia la interfaz del enemigo.

  Data.PokemonAllayAnimation = Allay.Animation; // Configura la animación del aliado.
  Data.PokemonEnemyAnimation = Enemy.Animation; // Configura la animación del enemigo.

  DrawBackground(); // Dibuja el fondo del escenario.
  DrawMoveSet(Data.ActualAllayPokemon); // Dibuja el conjunto de movimientos del aliado.
}

/**
 * Configura un botón en la interfaz para abrir una tabla de tipos en un enlace externo.
 */
function TypeChartButton() {
  document.getElementById('button2').addEventListener('click',
    () => {
      window.open("https://www.pkmn.help/defense/"); // Abre una página con la tabla de tipos.
    });
}
