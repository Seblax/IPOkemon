import { Config } from "./Config.js";
import { RandomZeroTo } from "./Data.js";
import { Screen } from "./Screen.js";
import { Sprite } from "./Sprite.js";

var screen;

export function DrawBackground() {
  screen = new Screen(".background-canvas");

  SetBackgroundSprites();
}

function SetBackgroundSprites() {
  const path = "assets/sprites/backgrounds/";
  const index = Math.floor(Math.random() * 35);

  Palette(index);

  // Crear instancias de Sprite
  const backgroundSprite = new Sprite(
    path + index + "_background.png",
    screen,
    0,
    0
  );
  const enemySprite = new Sprite(
    path + index + "_enemy.png",
    screen,
    Config.screen.width - 126,
    64
  );
  const allaySprite = new Sprite(
    path + index + "_allay.png",
    screen,
    -64,
    Config.screen.height - 32
  );

  // Cargar todas las imágenes usando promesas
  Promise.all([
    backgroundSprite.onload(),
    enemySprite.onload(),
    allaySprite.onload(),
  ])
    .then((sprites) => {
      // Todos los sprites se han cargado, ahora se dibujan
      sprites.forEach((sprite) => sprite.draw());
    })
    .catch((error) => {
      console.error("Error al cargar una o más imágenes:", error);
    });
}

function Palette() {
  const palettes = [];

  for (let i = 0; i < 6; i++) {
    palettes.push("palette-" + i);
  }

  // Remover otras clases de paleta si es necesario y agregar una nueva
  document.body.classList.remove(...palettes);
  document.body.classList.add(palettes[RandomZeroTo(7)]);
}
