import { Sprite } from "./utils/Sprite.js";
import { Screen } from "./utils/Screen.js";
import { Config } from "./utils/Config.js";

export class PokemonUI {
    constructor(pokemon) {
        this.hp = pokemon.hp;
        this.shiny = pokemon.shiny;
        this.mega = pokemon.mega;
        this.enemy = pokemon.enemy;
        this.screen = new Screen(".ui-canvas");

        this.typePrimary = pokemon.type1;
        this.typeSecondary = pokemon.type2;

        this.DrawUI();
    }


    DrawUI() {
        var path = "../assets/sprites/ui";
        var x = Config.screen.width - 120;
        var y = Config.screen.height - 48 - 7;


        if (this.enemy) {
            path += "/enemy/";
            x = 0;
            y = 0;
        } else {
            path += "/allay/";
        }

        var hpBar = new Sprite(path + "hp_bar.png", this.screen, x, y);
        var megaBar = new Sprite(path + "hp_bar.png", this.screen, x, y);

        if (this.mega) {
            megaBar = new Sprite(path + "mega_bar.png", this.screen, x, y);
        }

        if (this.shiny) {
            hpBar = new Sprite(path + "shiny_bar.png", this.screen, x, y);
        }
        
        this.DrawPokemonTypes(x, y);

        Promise.all([megaBar.onload(), hpBar.onload()])
            .then((sprites) => {
                sprites.forEach(sprite => sprite.draw());
            })
            .catch((error) => {
                console.error("Error al cargar una o más imágenes:", error);
            });

    }

    DrawPokemonTypes(x, y) {
        var type1= "../assets/sprites/types/"+this.typePrimary.toLowerCase() +".png";
        var type2= "../assets/sprites/types/"+this.typeSecondary.toLowerCase() +".png";

        if (this.enemy) {
            new Sprite(type1, this.screen, x + 1, y + 33);
            if(this.typeSecondary != "None")
                new Sprite(type2, this.screen,x + 50, y + 33);
        } else {
            new Sprite(type1, this.screen, x + 71, y + 33);
            if(this.typeSecondary != "None")
                new Sprite(type2, this.screen, x + 22, y + 33);
        }
    }
}