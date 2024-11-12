import { Sprite } from "../utils/Sprite.js";
import { Screen } from "../utils/Screen.js";
import { Config } from "../utils/Config.js";
import { Text } from "../utils/Text.js";

var textScreen;
var x;
var y;
/**
 * La clase `PokemonUI` gestiona la visualización de la interfaz de usuario de un Pokémon en un juego.
 * Incluye métodos para dibujar los elementos clave como:
 *    -nombre
 *    -tipos
 *    -barra de vida
 *    -nivel
 *    -otros detalles gráficos (shiny, megas)
 *
 * Tanto para Pokémon aliados como enemigos. Esta clase utiliza la biblioteca
 * de utilidades para manejar la pantalla, los sprites y el texto.
 */

export class PokemonUI {
  //==============================
  // Constructor
  //==============================

  constructor(pokemon) {
    this.pokemon = pokemon;
    this.screen = pokemon.enemy ? new Screen(".ui-enemy-canvas") : new Screen(".ui-allay-canvas") ;
    textScreen =  pokemon.enemy ? new Screen(".ui-enemy-text-canvas") : new Screen(".ui-allay-text-canvas") ;

    textScreen.resolution(20);

    this.screen.ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);
    textScreen.ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);


    this.type1 = pokemon.type1;
    this.type2 = pokemon.type2;

    // Dibuja el UI del Pokémon (tipos, etc.)
    this.DrawPokemonUI();
  }

  //==============================
  // Funciones
  //==============================

  //Esta función dibuja toda la UI relacionada con el pokemon, vida catual del pokemon,
  //nombre, nivel, shiny, etc.
  async DrawPokemonUI() {
    const basePath = "../assets/sprites/ui"; //Path de los recursos

    const isEnemy = this.pokemon.enemy; //Si el pokemon es enemigo
    const isMega = this.pokemon.mega; //Si el pokemon es mega
    const isShiny = this.pokemon.shiny; //SI el pokemon es shiny

    // Determina la ruta y posición según sea enemigo o aliado
    const path = `${basePath}/${isEnemy ? "enemy" : "allay"}/`;
    x = isEnemy ? Config.EnemyUI.width : Config.AllayUI.width;
    y = isEnemy ? Config.EnemyUI.height : Config.AllayUI.height;

    //Cargamos los sprites
    const nameText = this.DrawPokemonName();
    const hpText = this.DrawPokemonHP();
    const lvlText = this.DrawPokemonLv();
    const barSprite = this.DrawHpBar();

    // Dibuja los tipos del Pokémon
    this.DrawPokemonTypes();

    // Configura las UI del pokemon ya sea normal, shiny o Mega
    const normalUIPath = path + (isShiny ? "shiny_ui.png" : "normal_ui.png");
    const megaUIPath = path + (isMega ? "mega_ui.png" : "normal_ui.png");

    const normalUI = new Sprite(normalUIPath, this.screen, x, y);
    const megaUI = new Sprite(megaUIPath, this.screen, x, y);

    //Una vez cargadas los sprites, se dibujan en pantalla.
    try {
      await Promise.all([
        megaUI.onload(),
        barSprite.onload(),
        normalUI.onload(),
      ]);
      megaUI.draw();
      barSprite.draw();
      normalUI.draw();
    } catch (error) {
      console.error("Error al cargar una o más imágenes:", error);
    }
  }

  // Dibuja la cantidad de HP (puntos de vida) del Pokémon aliado en la pantalla.
  // Si el Pokémon es enemigo, la función no realiza ninguna acción.
  DrawPokemonHP() {
    if (this.pokemon.enemy) {
      //Si el pokemon es enemigo, no se aplica la lógica.
      return;
    }

    // Obtiene los valores de HP total y actual.
    var totalHp = this.pokemon.totalHp;
    var currentHp = this.pokemon.hp;

    // Dibuja el texto que muestra el HP total y el HP actual en la pantalla con formato específico.
    new Text(totalHp, textScreen, 226, 114, 10, "Pokefont", "start")
      .setColor("white")
      .setOutline(true)
      .drawText();

    new Text(currentHp + "/", textScreen, 225, 114, 10, "Pokefont", "end")
      .setColor("white")
      .setOutline(true)
      .drawText();
  }

  // Esta función dibuja la barra de vida del pokemon actual, en función del porcentaje
  // de vida que le falte:
  //    -100%:          Azul;
  //    -más de 60%:    Verde;
  //    -más de 30%:    Amarillo;
  //    -menos de 30%:  Rojo;
  DrawHpBar() {
    var isEnemy = this.pokemon.enemy;
    //porcentaje de vida que le falta al pokemon [0-1];
    var hpPercent = Math.max(
      0,
      Math.min(1, this.pokemon.hp / this.pokemon.totalHp)
    );


    //Path del asset de la barra de vida
    var i = 0;
    var barPath = "assets/sprites/ui/";
    
    if (hpPercent < 0.3) {
      i = 3;
    } else if (hpPercent < 0.6) {
      i = 2;
    } else if (hpPercent < 1) {
      i = 1;
    }

    barPath += i + "_hp_bar.png";

    //Posición de las barra de vida
    var pos = [x+44, y+20];
    pos = isEnemy ? pos : [pos[0]+12, pos[1]];

    //Dibuja la barra del fondo
    new Sprite("assets/sprites/ui/0_background_bar.png", 
      this.screen, 
      pos[0], 
      pos[1]);

    //Dibuja la barra de vida actual del pokemon
    var hpBar = new Sprite(barPath, 
      this.screen,
      pos[0] - 48 * (1 - hpPercent), 
      pos[1]);
    return hpBar;
  }

  //Esta función dibuja el nombre del correspondiente pokemon.
  DrawPokemonName() {
    var name = this.pokemon.name.split(" ")[0];
    var isEnemy = this.pokemon.enemy;

    //Posición del nombre
    var posSprite = [x + 10, y+2];

    //Dibujar el nombre
    new Text(name, textScreen, posSprite[0],  posSprite[1], 10, "Pokefont", "start")
      .setColor("white")
      .setOutline(true)
      .drawText();
  }

  //Esta función dibuja el nivel de los pokemons
  DrawPokemonLv() {
    var lvl = this.pokemon.lvl;
    var position = [x+94, y+4];


    //Dibujar sprite
    new Text(lvl, textScreen, position[0], position[1], 10, "Pokefont", "start")
      .setColor("white")
      .setOutline(true)
      .drawText();
  }

  DrawPokemonTypes() {
    //Recursos;
    var basePath = "../assets/sprites/types/";
    var type1 = this.type1.toLowerCase() + ".png";
    var type2 = this.type2.toLowerCase() + ".png";
    var None = "none.png";

    var isEnemy = this.pokemon.enemy; //Comprueba si el pokemon es enemigo
    var haveSecondType = type2 != None; //Comprueba si tiene segundo tipo

    var posSpriteType1 = isEnemy ? [x + 50, y + 33] : [x + 22, y + 33];
    var posSpriteType2 = isEnemy ? [x + 1, y + 33] : [x + 71, y + 33];

    //Carga los sprites
    haveSecondType
      ? new Sprite(
          basePath + type2,
          this.screen,
          posSpriteType1[0],
          posSpriteType1[1]
        )
      : null;

    new Sprite(
      basePath + type1,
      this.screen,
      posSpriteType2[0],
      posSpriteType2[1]
    );
  }
}
