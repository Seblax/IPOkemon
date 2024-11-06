import { DrawPokemonSprite } from "./scripts/utils/PokemonSprites.js";
import { DrawBackground } from "./scripts/utils/BackGround.js";
import { Screen } from "./scripts/utils/Screen.js";
import { PokemonUI } from "./scripts/PokemonUI.js";
import { PokemonTeam } from "./scripts/PokemonTeam.js";
import { Sprite } from "./scripts/utils/Sprite.js";
import { loadMovesFromCSV, loadPokemonFromCSV } from "./scripts/utils/CSV.js";
import { Data } from "./scripts/utils/Data.js";
import { Music, SetBattleMusic } from "./scripts/utils/Music.js";

window.onload = function () {
  (async () => {
    SetBattleMusic();

    Data.PokemonData = await loadPokemonFromCSV();
    Data.MovesData = await loadMovesFromCSV();

    const teamAllay = new PokemonTeam();
    const teamEnemy = new PokemonTeam();

    await teamAllay.generateTeam();
    await teamEnemy.generateTeam(true);

    const pokemon_1 = teamAllay.team[0];
    const pokemon_2 = teamEnemy.team[1];

    console.log(pokemon_1);
    console.log(pokemon_2);

    DrawPokemonSprite(pokemon_1);
    DrawPokemonSprite(pokemon_2);

    DrawBackground();

    let menuCanvas = new Screen(".game-menu-canvas");
    let menuSprite = new Sprite(
      "../assets/sprites/menu_pokemon.png",
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
  })();
};
