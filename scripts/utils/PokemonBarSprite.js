import { Config } from "./Config.js";
import { Random } from "./Data.js";
import { Sprite } from "./Sprite.js";

export class PokemonBarSprite {
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

    this.screen.ctx.translate(x, y);
    this.screen.ctx.imageSmoothingEnabled = false;

    this.defaultPath = path; // Guarda la ruta original del sprite

    // Posición inicial de la imagen.
    this.x = 0;

    this.frames = 0;
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

  Animate() {
    const ctx = this.screen.ctx;

    ctx.clearRect(0, 0, Config.screen.width, Config.screen.height);
    ctx.drawImage(this.image, x, 0);

    //Dibuja la barra del fondo
    new Sprite("assets/sprites/ui/0_background_bar.png", 
      this.screen, 
      this.x, 
      this.y);

    //Dibuja la barra de vida actual del pokemon
    var hpBar = new Sprite(barPath, 
      this.screen,
      pos[0] - 48 * (1 - hpPercent), 
      pos[1]);
    return hpBar;

    this.x += this.speed;

    requestAnimationFrame(() => this.AnimatePokemon());
  }
}
