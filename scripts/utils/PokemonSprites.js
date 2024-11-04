import { Screen } from "./Screen.js";
import { Sprite } from "./Sprite.js";


export function DrawPokemonSprite(pokemon) {
    const screen = new Screen(".game-canvas");

    let x,y;

    x = 256-112;
    y = 152-164;

    if(!pokemon.enemy){
        x = 256 - 250
        y = 152 - 70;
    }

    var path = GetPokemonSprite(pokemon);
    var pokemonSprite = new Sprite(path, screen, x, y);
}

function GetPokemonSprite(pokemon) {
    var normal = "assets/sprites/pokemons/";
    var mega = "assets/sprites/pokemons/megas/";

    var path = pokemon.mega ? mega : normal;

    var pokemonSprite = pokemon.id + ".png";
    
    if(!pokemon.enemy){
        path += pokemon.shiny ? "back_shiny/": "back/";
    }else{
        path += pokemon.shiny ? "frontal_shiny/": "frontal/";
    }

    return path + pokemonSprite;
}