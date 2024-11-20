import { DrawPokemonSprite } from "./scripts/DrawSprites/DrawPokemonSprites.js";
import { DrawBackground } from "./scripts/DrawSprites/DrawBackGround.js";
import { Screen } from "./scripts/utils/Screen.js";
import { PokemonUI } from "./scripts/DrawSprites/PokemonUI.js";
import { PokemonTeam } from "./scripts/Pokemons/PokemonTeam.js";
import { Sprite } from "./scripts/utils/Sprite.js";
import { Data, Random } from "./scripts/utils/Data.js";
import { Music, PlayBattleMusic, SetBattleMusic } from "./scripts/utils/Music.js";
import { DrawMoveSet, SetCanvasMoveSetResolution } from "./scripts/DrawSprites/MoveSetSprites.js";
import { moveSetButtons } from "./scripts/Moves/MovesBehavior.js";
import { loadMovesFromCSV, loadPokemonFromCSV, loadTypesFromCSV } from "./scripts/utils/CSV.js";


async function Start() {
  SetBattleMusic();
  SetCanvasMoveSetResolution();

  Data.PokemonData = await loadPokemonFromCSV();
  Data.MovesData = await loadMovesFromCSV();
  Data.Types = await loadTypesFromCSV();

  const teamAllay = new PokemonTeam();
  const teamEnemy = new PokemonTeam();

  await teamAllay.generateTeam(false);
  await teamEnemy.generateTeam(true);

  var pokemon_1 = teamAllay.team[0];
  var pokemon_2 = teamEnemy.team[0];


  Data.ActualAllayPokemon = pokemon_1;
  Data.ActualEnemyPokemon = pokemon_2;

  console.log(pokemon_1);
  console.log(pokemon_2);

  DrawBackground();

  if (pokemon_1.shiny || pokemon_2.shiny) {
    console.log("Hay un shiny");
  }

  moveSetButtons();
  
  Music();
  PlayBattleMusic();

  Data.UIAllay = DrawPokemonSprite(Data.ActualAllayPokemon);
  Data.UIEnemy = DrawPokemonSprite(Data.ActualEnemyPokemon);

  DrawMoveSet(Data.ActualAllayPokemon);

  Data.AnimationManager.start();
}

Start();