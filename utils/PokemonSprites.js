export function DrawPokemonSprite(pokemon, back) {
    const canvas = document.querySelector(".game-canvas");

    if (!canvas) {
        console.error("No se encontró ningún elemento con la clase 'game-canvas'.");
        return;
    }
    
    let x,y;
    let scale;

    x = 256-112;
    y = 152-144;

    if(back){
        x = 256 - 250
        y = 152 - 70;
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
    image.src = GetPokemonSprite(pokemon,back);

    image.onload = () => {
        ctx.drawImage(image, x, y);
        console.log(pokemon.getStats());
    };

    image.onerror = () => {
        console.error("Error al cargar la imagen del sprite: " + image.src);
    };
}

function GetPokemonSprite(pokemon, back) {
    var path = "/Sprites/";
    var pokemonSprite = pokemon.id + ".png";
    
    if(back){
        path += "back/";
    }

    if(pokemon.shiny){
        path += "shiny/";
    }

    return path + pokemonSprite;
}