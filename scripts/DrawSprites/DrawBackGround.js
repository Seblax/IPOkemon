import { Config } from "../utils/Config.js";
import { Data, RandomZeroTo } from "../utils/Data.js";
import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";

const screen = new Screen(".background-canvas"); // Variable global para la instancia de `Screen`.

export function DrawBackground() {
  SetBackgroundSprites();
}

function SetBackgroundSprites() {
  // Ruta base para las imágenes de fondo.
  const path = "assets/sprites/backgrounds/";
  const index = RandomZeroTo(Config.Background.numBackgrounds + 1);

  const background = path + index + "_background.png";
  const enemyBase = path + index + "_enemy.png";
  const allayBase = path + index + "_allay.png";

  // Llama a la función para cambiar la paleta de colores de la página.
  Palette(index);

  // Crea instancias de `Sprite` con rutas de imagen específicas y posiciones en el canvas.
  const backgroundSprite = new Sprite(background, screen, 0, 0);

  const enemySprite = new Sprite(
    enemyBase,
    screen,
    Config.Background.EnemyBase.x,
    Config.Background.EnemyBase.y
  );
  const allaySprite = new Sprite(
    allayBase, // Imagen específica para el sprite aliado.
    screen,
    Config.Background.AllayBase.x,
    Config.Background.AllayBase.y
  );

  
  const menuSprite = new Sprite(
    "../assets/sprites/move_set.png",
    new Screen(".move-set-canvas"),
    0,
    0
  );

  const DrawBackground = (deltaTime) => {
    backgroundSprite.draw();
    enemySprite.draw();
    allaySprite.draw();
    menuSprite.draw();
  };

  Data.AnimationManager.add(DrawBackground);
}

function Palette() {
  const palettes = []; // Array para almacenar nombres de clases de paletas de color.

  // Genera nombres de clase de paleta y los agrega al array.
  for (let i = 0; i < 6; i++) {
    palettes.push("palette-" + i);
  }

  // Remueve las clases de paleta existentes en el elemento `body` y agrega una nueva al azar.
  document.body.classList.remove(...palettes);
  document.body.classList.add(palettes[RandomZeroTo(7)]);
}
