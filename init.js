import { DrawPokemonSprite } from "./utils/PokemonSprites.js";
import { DrawBackground } from "./utils/BackGround.js";

DrawBackground();

window.onload = function () {
  (async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio

    const pokemon_1 = team.team[0];
    const pokemon_2 = team.team[1];
    
    DrawPokemonSprite(pokemon_1, Boolean(false));
    DrawPokemonSprite(pokemon_2, Boolean(true));

    if(pokemon_1.shiny || pokemon_2.shiny){
      console.log("Hay un shiny");
    }


    const canvas = document.querySelector(".game-menu-canvas");

    if (!canvas) {
        console.error("No se encontró ningún elemento con la clase 'game-canvas'.");
        return;
    }

    const ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  })();
};