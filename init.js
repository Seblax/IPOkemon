(function (){

(async () => {
    const team = new PokemonTeam();
    await team.generateTeam(); // Asegúrate de que el archivo CSV esté en el mismo directorio
    team.displayTeam();
    const pokemon = team.team[0];
    drawSprite(pokemon);
})();


}
)();

function drawSprite(pokemon){
  const canvas = document.getElementsByClassName("game-canvas");
  const ctx = canvas.getContext("2d");
  var image = image.src("/Sprites/" + pokemon.id + ".png");
  ctx.drawImage(image, 33,33);
}