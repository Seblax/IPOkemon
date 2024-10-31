import { DrawPokemonSprite } from "./utils/PokemonSprites.js";
import { DrawBackground } from "./utils/BackGround.js";
import { Screen } from "./utils/Screen.js";

DrawBackground();

window.onload = function () {
  (async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio

    const pokemon_1 = team.team[0];
    const pokemon_2 = team.team[1];

    
    DrawPokemonSprite(pokemon_1, Boolean(false));
    DrawPokemonSprite(pokemon_2, Boolean(true));

    let screen = new Screen(".game-menu-canvas");

    const image = new Image();
    image.src = "assets/sprites/backgrounds/0_background.png";

    image.onload = () => {
      screen.drawImage(image, 0, 0);
    };

    if(pokemon_1.shiny || pokemon_2.shiny){
      console.log("Hay un shiny");
    }

  })();
};