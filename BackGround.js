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
  