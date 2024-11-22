import { GenerateNewPokemon } from "../../game.js";
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
    if (!Config.isMuted) this.sound.play();

    // Velocidad de movimiento en el eje X.
    this.speed = pokemon.speed / 40;
    this.state = this.AppearAnimation(pokemon);
  }

  //==============================
  // Funciones
  //==============================

  AppearAnimation() {
    var appearframes = 0;
    Data.AnimationManager.remove(this.state);

    const appearCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      //El jugador no puede interactuar con los ataques en esta animación
      Data.YouTurn = false;

      if (appearframes < 0.5 * 60) {
        this.sprite.y = 2 * Math.sin(this.offset + 100 * appearframes);
        appearframes++;
      } else {
        // Cambia al siguiente estado de animación
        Data.AnimationManager.remove(appearCallback); // Detenemos esta animación
        this.IdleAnimation(); // Inicia la animación principal

        //El jugador puede interactuar con los ataques en esta animación
        Data.YouTurn = true;
      }

      this.state = appearCallback;
    };

    // Añade la animación al gestor
    Data.AnimationManager.add(appearCallback);
  }

  IdleAnimation() {
    Data.AnimationManager.remove(this.state);

    const animateCallback = (deltaTime) => {
      this.screen.clear();
      this.sprite.draw();

      this.sprite.y =
        -this.amplitude * Math.sin(this.offset + this.frequency * this.i);
      const angle = 0.0002 * Math.sin(this.offset + this.frequency * this.i);
      if (this.pokemon.speed >= 40) this.screen.rotate(angle);

      this.i += this.speed;

      if (this.pokemon.hp <= 0) {
        Data.AnimationManager.remove(animateCallback);
      }

      this.state = animateCallback;
    };

    Data.AnimationManager.add(animateCallback);
  }

  KillAnimation() {
    var killFrames = 0;
    if (!Config.isMuted) this.sound.play();

    Data.AnimationManager.remove(this.state);

    const killCallback = (deltaTime) => {
      this.screen.clear();
      killFrames++;

      //El jugador no puede interactuar con los ataques en esta animación
      Data.YouTurn = false;

      if (killFrames < 0.5 * 60) {
        this.sprite.y += 0.5;
        this.sprite.draw();
      } else if (killFrames > 2.5 * 60) {
        Data.AnimationManager.remove(killCallback); // Termina esta animación
        GenerateNewPokemon(this.pokemon.enemy);
      }

      this.state = killCallback;
    };

    Data.AnimationManager.add(killCallback);
  }

  AttackAnimation(move) {
    moveSound(move);

    var attackFrames = 0; // Restablecemos el número de cuadros
    var orientation = this.pokemon.enemy ? -1 : 1;
    Data.AnimationManager.remove(this.state);

    const attackCallback = (deltaTime) => {
      this.screen.clear(this.sprite.x - 10, this.sprite.y - 10);
      this.sprite.draw();

      // Movimiento hacia adelante y hacia atrás
      this.sprite.x += 5 * orientation; // Movimiento hacia adelante y hacia atrás
      this.sprite.y -= 5 * orientation;

      // Efectos visuales: podemos agregar destellos o partículas opcionales aquí
      attackFrames++;

      if (attackFrames > 20) {
        // Duración de la animación (en frames)

        this.screen.clear(this.sprite.x, this.sprite.y);
        this.sprite.x = 0;
        this.sprite.y = 0;

        Data.AnimationManager.remove(attackCallback); // Terminamos la animación
        this.IdleAnimation();
      } else if (attackFrames > 10) {
        // Duración de la animación (en frames)
        orientation = this.pokemon.enemy ? 1 : -1;
      }

      this.state = attackCallback;
    };

    Data.AnimationManager.add(attackCallback);
  }

  DamageAnimation() {
    var damageFrames = 0; // Restablecemos el número de cuadros
    Data.AnimationManager.remove(this.state);

    const damageCallback = (deltaTime) => {
      this.screen.clear(-10,-10);
      this.sprite.draw();

      // Simulamos el temblor con un pequeño movimiento aleatorio
      this.sprite.x += 3 * Math.sin(this.offset + 200 * damageFrames);

      // Cambiar temporalmente el color del sprite (parpadeo en rojo)
      if (
        (damageFrames > 10 && damageFrames < 20) ||
        (damageFrames > 30 && damageFrames < 40) ||
        (damageFrames > 50 && damageFrames < 60)
      ) {
        this.screen.clear();
      }

      if (damageFrames > 70) {
        // Duración de la animación (en frames)
        Data.AnimationManager.remove(damageCallback); // Terminamos la animación
        this.IdleAnimation();

        if (this.pokemon.hp <= 0) {
          this.KillAnimation(); // Inicia el siguiente estado
        }
      }

      this.state = damageCallback;
      damageFrames++;
    };

    Data.AnimationManager.add(damageCallback);
  }
}

function moveSound(move) {
  var sound = document.getElementById("move");
  sound.volume = 0.75;

  async function loadSound() {
    const moveSound = `assets/music/moves/${move.name}.mp3`;

    // Verificar si el archivo existe con una petición HEAD
    const response = await fetch(moveSound, { method: "HEAD" });
    if (response.ok) {
      sound.src = moveSound; // Si existe, asignar el archivo
    } else {
      console.warn(
        "Archivo del movimiento no encontrado, cargando archivo por defecto."
      );
      sound.src = "assets/music/moves/X Scissor.mp3";
    }

    sound.play();
  }

  if (!Config.isMuted) loadSound();
}
