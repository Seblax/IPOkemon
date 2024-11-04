import { DrawPokemonSprite } from "./scripts/utils/PokemonSprites.js";
import { DrawBackground } from "./scripts/utils/BackGround.js";
import { Screen } from "./scripts/utils/Screen.js";
import { PokemonUI } from "./scripts/PokemonUI.js";
import { PokemonTeam } from "./scripts/PokemonTeam.js";
import { Sprite } from "./scripts/utils/Sprite.js";

window.onload = function () {
  (async () => {
    const teamAllay = new PokemonTeam();
    const teamEnemy = new PokemonTeam();
    await teamAllay.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio
    await teamEnemy.generateTeam();

    teamEnemy.setEnemy();

    const pokemon_1 = teamAllay.team[0];
    const pokemon_2 = teamEnemy.team[1];
    
    DrawPokemonSprite(pokemon_1);
    DrawPokemonSprite(pokemon_2);

    DrawBackground();
    
    let menuCanvas = new Screen(".game-menu-canvas");
    let menuSprite = new Sprite("../assets/sprites/menu_pokemon.png", menuCanvas, 0, 0)
    menuCanvas.drawCanvas(menuSprite.image,0,0)

    if(pokemon_1.shiny || pokemon_2.shiny){
      console.log("Hay un shiny");
    }

    document.getElementById("playButton").onclick = function() {
      musica();
    };

    new PokemonUI(pokemon_1);
    new PokemonUI(pokemon_2);
  })();
};

function musica(){
  var musica = document.getElementById("ost");
  musica.src = "../assets/music/fight/" + Math.floor(Math.random() * 8) + "_fight.ogg";
  musica.play().catch(function(error) {
    console.log("No se pudo reproducir la música: ", error);
  });

   // Configuramos la música para que se reinicie al terminar
   musica.addEventListener("ended", function() {
       musica.currentTime = 0; // Reinicia la música al inicio
       musica.play();          // Reproduce nuevamente
   });
}