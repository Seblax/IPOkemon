import { DrawPokemonSprite } from "./scripts/DrawSprites/DrawPokemonSprites.js";
import { DrawBackground } from "./scripts/DrawSprites/DrawBackGround.js";
import { PokemonTeam } from "./scripts/Pokemons/PokemonTeam.js";
import { Data } from "./scripts/utils/Data.js";
import { Music, SetBattleMusic } from "./scripts/Music.js";
import { DrawMoveSet } from "./scripts/DrawSprites/MoveSetSprites.js";
import { MoveSetButtonsBehavior } from "./scripts/Moves/MovesBehavior.js";
import { loadMovesFromCSV, loadPokemonFromCSV, loadTypesFromCSV } from "./scripts/utils/CSV.js";
import { Test1, Test2, Test3, Test4, Test5 } from "./scripts/Tests/Test.js";

const teamAllay = new PokemonTeam();
const teamEnemy = new PokemonTeam();

Start();

async function Start() {
  await LoadData();
  await GenerateTeams();

  MoveSetButtonsBehavior();

  SetBattleMusic();
  Music();

  // Partida normal
  LoadPokemons();

  // Partida con Casuisticas
  // await Test1();  //  Eficacia x0,25 x0,5 x1, x2 y x4;
  // Test2();  //  Eficacia x0
  // await Test3();  //  Shinys y Megas
  // await Test4();  //  Rápido vs Lento, Lento con ataque con prioridad
  // await Test5();  //  Pokemon Customizados

  DrawAll();
}

export async function GenerateNewPokemon(isEnemy) {
  var team = new PokemonTeam();
  await team.generateTeam(isEnemy);
  const pokemon = team.team[0];

  if (isEnemy) {
    Data.ActualEnemyPokemon = pokemon;
    const Enemy = DrawPokemonSprite(Data.ActualEnemyPokemon);
    Data.UIEnemy = Enemy.UI;
    Data.PokemonEnemyAnimation = Enemy.Animation;
  } else {
    Data.ActualAllayPokemon = pokemon;
    const Allay = DrawPokemonSprite(Data.ActualAllayPokemon);
    Data.UIAllay = Allay.UI;
    Data.PokemonAllayAnimation = Allay.Animation;
    DrawMoveSet(Data.ActualAllayPokemon);
  }

}

async function LoadData() {
  Data.PokemonData = await loadPokemonFromCSV();
  Data.MovesData = await loadMovesFromCSV();
  Data.Types = await loadTypesFromCSV();

  Data.AnimationManager.start();
}

async function GenerateTeams() {
  await teamAllay.generateTeam(false);
  await teamEnemy.generateTeam(true);
}

function LoadPokemons() {
  Data.ActualAllayPokemon = teamAllay.team[0];
  Data.ActualEnemyPokemon = teamEnemy.team[0];
}

function DrawAll() {
  const Allay = DrawPokemonSprite(Data.ActualAllayPokemon);
  const Enemy = DrawPokemonSprite(Data.ActualEnemyPokemon);

  Data.UIAllay = Allay.UI;
  Data.UIEnemy = Enemy.UI;

  Data.PokemonAllayAnimation = Allay.Animation;
  Data.PokemonEnemyAnimation = Enemy.Animation;

  DrawBackground();
  DrawMoveSet(Data.ActualAllayPokemon);
}