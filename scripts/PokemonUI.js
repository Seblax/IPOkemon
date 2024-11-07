import { Sprite } from "./utils/Sprite.js";
import { Screen } from "./utils/Screen.js";
import { Config } from "./utils/Config.js";
import { Text } from "./utils/Text.js";

const textScreen = new Screen(".ui-text-canvas").resolution(20);

export class PokemonUI {
    constructor(pokemon) {
        this.pokemon = pokemon;
        this.screen = new Screen(".ui-canvas");

        this.type1 = pokemon.type1;
        this.type2 = pokemon.type2;

        this.DrawPokemonUI();
        this.DrawPokemonName();
        this.DrawPokemonHP();
        this.DrawPokemonLv();
    }


    async DrawPokemonUI() {
        const basePath = "../assets/sprites/ui";
        const isEnemy = this.pokemon.enemy;
        const isMega = this.pokemon.mega;
        const isShiny = this.pokemon.shiny;

        // Determina la ruta y posición según sea enemigo o aliado
        const path = `${basePath}/${isEnemy ? "enemy" : "allay"}/`;
        const x = isEnemy ? 0 : Config.screen.width - 120;
        const y = isEnemy ? 0 : Config.screen.height - 55;

        // Configura las barras de HP y Mega
        const hpBarPath = path + (isShiny ? "shiny_bar.png" : "hp_bar.png");
        const megaBarPath = path + (isMega ? "mega_bar.png" : "hp_bar.png");

        const hpBar = new Sprite(hpBarPath, this.screen, x, y);
        const megaBar = new Sprite(megaBarPath, this.screen, x, y);

        try {
            await Promise.all([hpBar.onload(), megaBar.onload()]);
            megaBar.draw();
            hpBar.draw();
        } catch (error) {
            console.error("Error al cargar una o más imágenes:", error);
        }

        // Dibuja los tipos del Pokémon
        this.DrawPokemonTypes(x, y);
    }

    DrawPokemonHP(){
        if(this.pokemon.enemy){
            return;
        }
        var totalHp = this.pokemon.totalHp;
        var currentHp = this.pokemon.hp;

        new Text(totalHp, textScreen,226, 114, 10, "Pokefont","start").setColor("white").setOutline(true).drawText();
        new Text(currentHp + "/", textScreen,225, 114, 10, "Pokefont","end").setColor("white").setOutline(true).drawText();
    }

    
    DrawPokemonName(){
        var name = this.pokemon.name;

        var x =150;
        var y =100;

        if(this.pokemon.enemy){
            x = 10;
            y = 8;
        }

        new Text(name, textScreen,x, y, 10, "Pokefont","start").setColor("white").setOutline(true).drawText();
    }

    DrawPokemonLv(){
        var lvl = this.pokemon.lvl;

        var x =226;
        var y =101;

        if(this.pokemon.enemy){
            x = 94;
            y = 9;
        }

        new Text(lvl, textScreen,x, y, 10, "Pokefont","start").setColor("white").setOutline(true).drawText();
    }

    DrawPokemonTypes(x, y) {
        //Recursos;
        var basePath = "../assets/sprites/types/";
        var type1 = this.type1.toLowerCase() + ".png";
        var type2 = this.type2.toLowerCase() + ".png";
        var None = "none.png";

        var isEnemy = this.pokemon.enemy;               //Comprueba si el pokemon es enemigo
        var haveSecondType = type2 != None;   //Comprueba si tiene segundo tipo

        var posSpriteType1 = isEnemy ? [x + 50, y + 33] : [x + 22, y + 33];
        var posSpriteType2 = isEnemy ? [x + 1, y + 33] : [x + 71, y + 33];

        //Carga los sprites
        haveSecondType ? new Sprite(basePath + type2,
            this.screen,
            posSpriteType1[0],
            posSpriteType1[1]) : null;

        new Sprite(basePath + type1,
            this.screen,
            posSpriteType2[0],
            posSpriteType2[1]);
    }
}