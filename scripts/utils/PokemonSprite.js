import { Config } from "./Config.js";
import { Random } from "./Data.js";
import { Sprite } from "./Sprite.js";

export class PokemonSprite {
  //==============================
  // Constructor
  //==============================

  constructor(path, screen, x, y) {
    this.sprite = new Sprite(path, screen, x, y, false);
    this.image = new Image();
    this.image.src = path;
    this.screen = screen;
    this.x = x;
    this.y = y;
    this.width = 50; // Ancho del sprite (ajústalo según tus necesidades)
    this.height = 50; // Alto del sprite (ajústalo según tus necesidades)

    this.screen.ctx.translate(x, y);
    this.screen.ctx.imageSmoothingEnabled = false;

    this.defaultPath = path; // Guarda la ruta original del sprite

    // Posición inicial de la imagen.
    this.x = 0;
    this.amplitude = 5; // Amplitud de la onda (altura de la oscilación).
    this.frequency = 0.005; // Frecuencia de la onda (controla la longitud de la onda).

    this.AppearFrames = 0;
    this.offset = Random();

    // Velocidad de movimiento en el eje X.
    this.speed = 2;
  }

  //==============================
  // Funciones
  //==============================

  // Comprueba si la imagen ha sido cargada
  onload() {
    this.sprite.onload();
  }

  // Dibuja el sprite en la pantalla
  draw() {
    this.sprite.draw();
  }

  // Dibuja el sprite en la pantalla cuando la imagen se carga
  drawSprite() {
    this.sprite.drawSprite();
  }

  AnimatePokemon() {
    const ctx = this.screen.ctx;

    // Limpiamos el canvas.
    ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);

    // Calculamos la posición en el eje Y usando la función seno.
    const y = -this.amplitude * Math.sin(+this.frequency * this.x);
    const angle = 0.0002 * Math.sin(this.offset + this.frequency * this.x); // 45 grados
    ctx.rotate(angle);

    // Dibujamos la imagen en la posición actual.
    ctx.drawImage(this.image, 0, y);

    // Actualizamos la posición en el eje X.
    // Verificamos si la imagen sale del canvas y la reiniciamos.
    this.x += this.speed;

    // Llamamos a requestAnimationFrame para la siguiente actualización.
    requestAnimationFrame(() => this.AnimatePokemon());
  }

  AppearPokemon(pokemon) {
    const ctx = this.screen.ctx;
    ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);
    let AppearFrames = this.AppearFrames;
    const offset = this.offset;
    const image = this.image;
    const AnimatePokemon = this.AnimatePokemon();

    AppearSound();

    function AppearSound() {
      const sound = document.getElementById(pokemon.enemy ? "enemy" : "allay");
      sound.src = `../assets/music/appears/${pokemon.id}.ogg`; // Establece la fuente de audio (`src`) al valor de `Data.Music`.
      sound.play();
    }

    function animate() {
      ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);

      // Asegúrate de que no se pase de los 2 segundos de animación
      if (AppearFrames < 0.5 * 60) {
        // 2 segundos = 120 cuadros si el frameRate es 60fps
        const y =
          2 * Math.sin(offset + 100 * AppearFrames);

        // Dibujamos la imagen en la posición actual.
        ctx.drawImage(image, 0, y);

        // Actualizamos el contador de frames
        AppearFrames++;

        // Llamamos a requestAnimationFrame para la siguiente actualización
        requestAnimationFrame(() => animate());
      } else {
        // Cuando los 2 segundos hayan pasado, se reinicia la animación
        AppearFrames = 0;
        requestAnimationFrame(() => AnimatePokemon); // Llama a la siguiente fase de animación
      }
    }

    animate(); // Inicia la animación
  }
}
