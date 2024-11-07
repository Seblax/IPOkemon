import { Sprite } from "./utils/Sprite.js";
import { Screen } from "./utils/Screen.js";
import { Config } from "./utils/Config.js";
import { Text } from "./utils/Text.js";

export class PokemonUI {
    constructor(pokemon) {
        this.hp = pokemon.hp;
        this.totalHp = pokemon.totalHp;
        this.shiny = pokemon.shiny;
        this.mega = pokemon.mega;
        this.enemy = pokemon.enemy;
        this.screen = new Screen(".ui-canvas");

        this.type1 = pokemon.type1;
        this.type2 = pokemon.type2;

        this.DrawPokemonUI();
        this.DrawPokemonHP();
    }


    async DrawPokemonUI() {
        const basePath = "../assets/sprites/ui";
        const isEnemy = this.enemy;
        const isMega = this.mega;
        const isShiny = this.shiny;

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
        var totalHp = this.totalHp;
        var currentHp = this.hp;
        var textScreen = new Screen(".ui-text-canvas");
        textScreen.clear();
        textScreen.resolution(20);

        new Text(totalHp, textScreen,226, 115, 10, "Pokefont","start").setColor("white").setOutline(true).drawText();
        new Text(currentHp, textScreen,216, 115, 10, "Pokefont","end").setColor("white").setOutline(true).drawText();
    }

    DrawPokemonTypes(x, y) {
        //Recursos;
        var basePath = "../assets/sprites/types/";
        var type1 = this.type1.toLowerCase() + ".png";
        var type2 = this.type2.toLowerCase() + ".png";
        var None = "none.png";

        var isEnemy = this.enemy;               //Comprueba si el pokemon es enemigo
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