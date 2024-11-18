import { DrawPokemonSprite } from "../DrawSprites/DrawPokemonSprites.js";
import { Pokemon } from "../Pokemons/Pokemon.js";
import { Config } from "./Config.js";
import { Data, Random, RandomRange, RandomZeroTo } from "./Data.js";
import { Sprite } from "./Sprite.js";

export class PokemonSprite {
  //==============================
  // Constructor
  //==============================

  constructor(path, screen, x, y, pokemon) {
    this.sprite = new Sprite(path, screen, 0, 0);
    this.screen = screen;

    this.pokemon = pokemon;

    this.screen.ctx.translate(x, y);
    this.screen.ctx.imageSmoothingEnabled = false;

    this.i = 0;
    this.amplitude = 5; // Amplitud de la onda (altura de la oscilación).
    this.frequency = 0.005; // Frecuencia de la onda (controla la longitud de la onda).

    this.frames = 0; //Frames para la animación
    this.offset = RandomZeroTo(10); //Offset aleatorio

    //Sonido del pokemon
    this.sound = document.getElementById(
      this.pokemon.enemy ? "enemy" : "allay"
    );
    this.sound.src = `../assets/music/appears/${this.pokemon.id}.ogg`; // Establece la fuente de audio (`src`) al valor de `Data.Music`.
    this.sound.play();

    // Velocidad de movimiento en el eje X.
    this.speed = pokemon.speed / 40;
    this.AppearPokemon(pokemon);
  }

  //==============================
  // Funciones
  //==============================

  
  AppearPokemon() {
    this.frames = 0;
    
    const appearCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();
      
      if (this.frames < 0.5 * 60) {
        this.sprite.y = 2 * Math.sin(this.offset + 100 * this.frames);
        this.frames++;
      } else {
        // Cambia al siguiente estado de animación
        Data.AnimationManager.remove(appearCallback); // Detenemos esta animación
        this.AnimatePokemon(); // Inicia la animación principal
      }
    };

    // Añade la animación al gestor
    Data.AnimationManager.add(appearCallback);
  }
  
  
  AnimatePokemon() {
    const animateCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      this.sprite.y =
        -this.amplitude * Math.sin(this.offset + this.frequency * this.i);
      const angle = 0.0002 * Math.sin(this.offset + this.frequency * this.i);
      this.screen.rotate(angle);

      this.i += this.speed;

      if (this.pokemon.hp <= 0) {
        Data.AnimationManager.remove(animateCallback); // Detenemos esta animación
        this.KillPokemon(); // Inicia el siguiente estado
      }
    };

    Data.AnimationManager.add(animateCallback);
  }


  KillPokemon() {
    this.frames = 0;
    this.sound.play();

    const killCallback = (deltaTime) => {
      this.screen.clear();
      this.frames++;

      if (this.frames < 0.5 * 60) {
        this.sprite.y += 0.5;
        this.sprite.draw();
      } else if (this.frames > 2.5 * 60) {
        Data.AnimationManager.remove(killCallback); // Termina esta animación
        Data.ActualEnemyPokemon = Pokemon.copy(
          Data.PokemonData[RandomZeroTo(735)]
        );
        Data.ActualEnemyPokemon.enemy = true;
        DrawPokemonSprite(Data.ActualEnemyPokemon);
      }
    };

    Data.AnimationManager.add(killCallback);
  }
}
