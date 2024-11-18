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
import {
  loadMovesFromCSV,
  loadPokemonFromCSV,
  loadTypesFromCSV,
} from "./scripts/utils/CSV.js";
import { Text } from "./scripts/utils/Text.js";
import { Config } from "./scripts/utils/Config.js";

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

  const pokemon_1 = teamAllay.team[0];
  const pokemon_2 = teamEnemy.team[0];

  pokemon_1.hp = Math.round(pokemon_1.totalHp * Random());
  // pokemon_2.hp = Math.round(pokemon_2.totalHp * Random());

  Data.ActualAllayPokemon = pokemon_1;
  Data.ActualEnemyPokemon = pokemon_2;

  // console.log(pokemon_1);
  // console.log(pokemon_2);

  DrawBackground();

  let menuCanvas = new Screen(".move-set-canvas");
  let menuSprite = new Sprite(
    "../assets/sprites/move_set.png",
    menuCanvas,
    0,
    0
  );


  menuCanvas.drawCanvas(menuSprite.image, 0, 0);

  if (pokemon_1.shiny || pokemon_2.shiny) {
    console.log("Hay un shiny");
  }

  Music();
  moveSetButtons();
  UpdateScreen();
  PlayBattleMusic();

  var allaySprite = DrawPokemonSprite(Data.ActualAllayPokemon);
  var enemySprite = DrawPokemonSprite(Data.ActualEnemyPokemon); 


  new PokemonUI(Data.ActualAllayPokemon);
  new PokemonUI(Data.ActualEnemyPokemon);
  
  DrawMoveSet(Data.ActualAllayPokemon);

  ////////////////////
  Data.AnimationManager.start();
}

export function DrawAll(){
  new PokemonUI(Data.ActualAllayPokemon);
  new PokemonUI(Data.ActualEnemyPokemon);
  
  DrawMoveSet(Data.ActualAllayPokemon);

}

function UpdateScreen() {
  requestAnimationFrame(UpdateScreen.bind(this));
}

Start();