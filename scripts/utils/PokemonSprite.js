import { GenerateNewPokemon } from "../../game.js";
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
    this.screen.blur(false);

    this.i = 0;
    this.amplitude = 5; // Amplitud de la onda (altura de la oscilación).
    this.frequency = 0.005; // Frecuencia de la onda (controla la longitud de la onda).

    this.offset = RandomZeroTo(10); //Offset aleatorio

    //Sonido del pokemon
    this.sound = document.getElementById(
      this.pokemon.enemy ? "enemy" : "allay"
    );
    this.sound.src = `../assets/music/appears/${this.pokemon.id}.ogg`; // Establece la fuente de audio (`src`) al valor de `Data.Music`.
    !Config.isMuted ? this.sound.play() : null;

    // Velocidad de movimiento en el eje X.
    this.speed = pokemon.speed / 40;
    this.AppearAnimation(pokemon);
  }

  //==============================
  // Funciones
  //==============================


  AppearAnimation() {
    var appearframes = 0;

    const appearCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      if (appearframes < 0.5 * 60) {
        this.sprite.y = 2 * Math.sin(this.offset + 100 * appearframes);
        appearframes++;
      } else {
        // Cambia al siguiente estado de animación
        Data.AnimationManager.remove(appearCallback); // Detenemos esta animación
        this.IdleAnimation(); // Inicia la animación principal
      }
    };

    // Añade la animación al gestor
    Data.AnimationManager.add(appearCallback);
  }


  IdleAnimation() {
    const animateCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      this.sprite.y = - this.amplitude * Math.sin(this.offset + this.frequency * this.i);
      const angle = 0.0002 * Math.sin(this.offset + this.frequency * this.i);
      if (this.pokemon.speed >= 40)
        this.screen.rotate(angle);

      this.i += this.speed;
    };

    Data.AnimationManager.add(animateCallback);
  }


  KillAnimation() {
    var killFrames = 0;
    this.sound.play();

    const killCallback = (deltaTime) => {
      this.screen.clear();
      killFrames++;

      if (killFrames < 0.5 * 60) {
        this.sprite.y += 0.5;
        this.sprite.draw();
      } else if (killFrames > 2.5 * 60) {
        Data.AnimationManager.remove(killCallback); // Termina esta animación
        GenerateNewPokemon(this.pokemon.enemy);
      }
    };

    Data.AnimationManager.add(killCallback);
  }

  AttackAnimation() {
    var attackFrames = 0;  // Restablecemos el número de cuadros
    var orientation = this.pokemon.enemy ? -1 : 1;

    const attackCallback = (deltaTime) => {
      this.screen.clear(this.sprite.x, this.sprite.y);
      this.sprite.draw();

      // Movimiento hacia adelante y hacia atrás
      this.sprite.x += 5 * orientation;  // Movimiento hacia adelante y hacia atrás
      this.sprite.y -= 5 * orientation;

      // Efectos visuales: podemos agregar destellos o partículas opcionales aquí
      attackFrames++;

      if (attackFrames > 20) {  // Duración de la animación (en frames)
        this.screen.clear(this.sprite.x, this.sprite.y);
        this.sprite.x = 0;
        this.sprite.y = 0;

        Data.AnimationManager.remove(attackCallback);  // Terminamos la animación
        this.IdleAnimation()
      } else if (attackFrames > 10) {  // Duración de la animación (en frames)
        orientation = this.pokemon.enemy ? 1 : -1;
      }

    }

    Data.AnimationManager.add(attackCallback);
  }

  DamageAnimation() {
    var damageFrames = 0;  // Restablecemos el número de cuadros

    const damageCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      // Simulamos el temblor con un pequeño movimiento aleatorio
      this.sprite.x += 3 * Math.sin(this.offset + 200 * damageFrames);

      // Cambiar temporalmente el color del sprite (parpadeo en rojo)
      if (damageFrames > 10 && damageFrames < 20 ||
        damageFrames > 30 && damageFrames < 40 ||
        damageFrames > 50 && damageFrames < 60) {
        this.screen.clear();
      }

      damageFrames++;
      if (damageFrames > 70) {  // Duración de la animación (en frames)
        Data.AnimationManager.remove(damageCallback);  // Terminamos la animación
        this.sprite.color = "white";  // Restablecemos el color original
        if (this.pokemon.hp <= 0) {
          this.KillAnimation(); // Inicia el siguiente estado
        }
      }
    };

    Data.AnimationManager.add(damageCallback);
  }
}
