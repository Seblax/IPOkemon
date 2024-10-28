window.onload = function () {
  (async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio
  
    const pokemon_1 = team.team[0];
    const pokemon_2 = team.team[1];
    drawSprite(pokemon_1, 224, 16);
    drawSprite(pokemon_2, 32, 128, true);
  })();
};

function drawSprite(pokemon) {
  drawSprite(pokemon,0,0)
}

function drawSprite(pokemon, x, y) {
  drawSprite(pokemon,x,y,true);
}
function drawSprite(pokemon, x, y, back) {
  const canvas = document.querySelector(".game-canvas");
  const spritePath = back ?
          "/Sprites/back/"  + pokemon.id + ".png" : 
          "/Sprites/"  + pokemon.id + ".png";


  if (!canvas) {
    console.error("No se encontró ningún elemento con la clase 'game-canvas'.");
    return;
  }

  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

  if (!ctx) {
    console.error("No se pudo obtener el contexto 2D del canvas.");
    return;
  }

  const image = new Image();
  image.src = spritePath;

  image.onload = () => {
    ctx.drawImage(image, x, y);
    console.log(pokemon.getStats());
  };

  image.onerror = () => {
    console.error("Error al cargar la imagen del sprite: " + image.src);
  };
}
