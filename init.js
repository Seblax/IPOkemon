import { DrawPokemonSprite } from "./utils/PokemonSprites.js";
import { DrawBackground } from "./utils/BackGround.js";
import { Screen } from "./utils/Screen.js";
import { Sprite } from "./utils/Sprite.js";

DrawBackground();

window.onload = function () {
  (async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio

    const pokemon_1 = team.team[0];
    const pokemon_2 = team.team[1];
    
    DrawPokemonSprite(pokemon_1, Boolean(false));
    DrawPokemonSprite(pokemon_2, Boolean(true));

    let menuCanvas = new Screen(".game-menu-canvas");
    let menuSprite = new Sprite("../assets/sprites/menu_pokemon.png", menuCanvas, 0, 0)
    menuCanvas.drawCanvas(menuSprite.image,0,0)

    if(pokemon_1.shiny || pokemon_2.shiny){
      console.log("Hay un shiny");
    }

    var musica = document.getElementById("ost");
    musica.play().catch(function(error) {
      console.log("No se pudo reproducir la música: ", error);
    });
  })();
};