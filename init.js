import { DrawPokemonSprite } from "./utils/PokemonSprites.js";

window.onload = function () {
  (async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio

    const pokemon_1 = team.team[0];
    const pokemon_2 = team.team[1];
    
    DrawPokemonSprite(pokemon_1, 224, 16);
    DrawPokemonSprite(pokemon_2, 32, 128, true);

    if(pokemon_1.shiny || pokemon_2.shiny){
      console.log("Hay un shiny");
    }
  })();
};