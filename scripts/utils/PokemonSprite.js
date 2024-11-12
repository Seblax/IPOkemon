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

    // Posición inicial de la imagen.
    this.i = 0;
    this.amplitude = 5; // Amplitud de la onda (altura de la oscilación).
    this.frequency = 0.005; // Frecuencia de la onda (controla la longitud de la onda).

    this.frames = 0;
    this.offset = RandomZeroTo(10);

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

  AnimatePokemon() {
    this.screen.clear();
    this.sprite.draw();

    // Calculamos la posición en el eje Y usando la función seno.
    this.sprite.y =
      -this.amplitude * Math.sin(this.offset + this.frequency * this.i);
    const angle = 0.0002 * Math.sin(this.offset + this.frequency * this.i); // 45 grados
    this.screen.rotate(angle);

    // Dibujamos la imagen en la posición actual.

    // Actualizamos la posición en el eje X.
    // Verificamos si la imagen sale del canvas y la reiniciamos.
    this.i += this.speed;

    // Llamamos a requestAnimationFrame para la siguiente actualización.
    if (this.pokemon.hp <= 0) {
      requestAnimationFrame(() => this.KillPokemon());
    } else {
      requestAnimationFrame(() => this.AnimatePokemon());
    }
  }

  AppearPokemon() {
    const self = this;

    function animate() {
      // Limitar el número de operaciones que se ejecutan por cuadro.
      self.screen.clear();
      self.sprite.draw();

      if (self.frames < 0.5 * 60) {
        self.sprite.y = 2 * Math.sin(self.offset + 100 * self.frames);
        self.frames++;
        requestAnimationFrame(animate);
      } else {
        self.frames = 0;
        requestAnimationFrame(() => self.AnimatePokemon());
      }
    }

    animate(); // Inicia la animación
  }

  AppearSound() {}

  KillPokemon() {
    this.sound.play();
    const self = this;

    function animate() {
      // Limitar el número de operaciones que se ejecutan por cuadro.
      self.screen.clear();

      if (self.frames < 0.5 * 60) {
        self.sprite.y += self.speed / 5;
        self.sprite.draw();
        self.frames++;
        requestAnimationFrame(animate);
      } else {
        Data.ActualEnemyPokemon = Pokemon.copy(
          Data.PokemonData[RandomZeroTo(350)]
        );
        Data.ActualEnemyPokemon.enemy = true;

        DrawPokemonSprite(Data.ActualEnemyPokemon);
      }
    }

    animate(); // Inicia la animación
  }
}
