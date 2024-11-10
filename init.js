import { DrawPokemonSprite } from "./scripts/DrawSprites/PokemonSprites.js";
import { DrawBackground } from "./scripts/utils/BackGround.js";
import { Screen } from "./scripts/utils/Screen.js";
import { PokemonUI } from "./scripts/DrawSprites/PokemonUI.js";
import { PokemonTeam } from "./scripts/PokemonTeam.js";
import { Sprite } from "./scripts/utils/Sprite.js";
import { loadMovesFromCSV, loadPokemonFromCSV } from "./scripts/utils/CSV.js";
import { Data, Random } from "./scripts/utils/Data.js";
import { Music, SetBattleMusic } from "./scripts/utils/Music.js";
import { DrawMoveSet } from "./scripts/DrawSprites/MoveSetSprites.js";
import { moveSetButtons } from "./scripts/Moves/MovesBehavior.js";

window.onload = function () {
  (async () => {
    SetBattleMusic();

    Data.PokemonData = await loadPokemonFromCSV();
    Data.MovesData = await loadMovesFromCSV();

    const teamAllay = new PokemonTeam();
    const teamEnemy = new PokemonTeam();

    await teamAllay.generateTeam(false);
    await teamEnemy.generateTeam(true);

    const pokemon_1 = teamAllay.team[0];
    const pokemon_2 = teamEnemy.team[1];

    pokemon_1.hp = Math.round(pokemon_1.totalHp * Random());
    // pokemon_2.hp = Math.round(pokemon_2.totalHp * Random());

    Data.ActualPokemon = pokemon_1;

    console.log(pokemon_1);
    console.log(pokemon_2);

    DrawPokemonSprite(pokemon_1);
    DrawPokemonSprite(pokemon_2);

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

    new PokemonUI(pokemon_1);
    new PokemonUI(pokemon_2);

    Music();
    DrawMoveSet(pokemon_1);

    moveSetButtons();
  })();
};
