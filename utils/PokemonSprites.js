import { Screen } from "./Canvas.js";


export function DrawPokemonSprite(pokemon, back) {
    const screen = new Screen(".game-canvas");

    let x,y;
    let scale;

    x = 256-112;
    y = 152-144;

    if(back){
        x = 256 - 250
        y = 152 - 70;
    }

    const image = new Image();
    image.src = GetPokemonSprite(pokemon,back);

    image.onload = () => {
        screen.drawImage(image, x, y);
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