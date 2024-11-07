import { Config } from "../utils/Config.js";
import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";


export function DrawPokemonSprite(pokemon) {
    const screen = new Screen(".game-canvas");

    var x = Config.screen.width -112;
    var y = Config.screen.height -164;

    if(!pokemon.enemy){
        x = Config.screen.width - 250
        y = Config.screen.height - 70;
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