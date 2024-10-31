import { Screen } from "./Screen.js";
import { Sprite } from "./Sprite.js";

var screen;
var x,y;

export function DrawBackground() {
    screen = new Screen(".background-canvas");

    x = screen.canvas.width;
    y = screen.canvas.height;

    SetBackgroundSprites();
}

function SetBackgroundPalette(){
    document.documentElement.style.setProperty('--background-color', 'lightcoral');
}

function SetBackgroundSprites() {
    const path = "assets/sprites/backgrounds/";
    const index = Math.floor(Math.random() * 34);

    // Crear instancias de Sprite
    const backgroundSprite = new Sprite(path + index + "_background.png", screen, 0, 0);
    const enemySprite = new Sprite(path + index + "_enemy.png", screen, x - 126, 64);
    const allaySprite = new Sprite(path + index + "_allay.png", screen, -64, y - 32);

    // Cargar todas las imágenes usando promesas
    Promise.all([backgroundSprite.onload(), enemySprite.onload(), allaySprite.onload()])
        .then((sprites) => {
            // Todos los sprites se han cargado, ahora se dibujan
            sprites.forEach(sprite => sprite.draw());
        })
        .catch((error) => {
            console.error("Error al cargar una o más imágenes:", error);
        });
}

// function SetBackgroundSprites() {

    // const path = "assets/sprites/backgrounds/";

    // const background = new Image();
    // const enemy = new Image();
    // const allay = new Image();

    // const index = Math.floor(Math.random() * 34);

    // background.src = path + index + "_background.png";
    // enemy.src = path + index + "_enemy.png";
    // allay.src = path + index + "_allay.png";

    // // Crear promesas para cada imagen
    // const loadBackground = new Promise((resolve) => { background.onload = resolve; });
    // const loadEnemy = new Promise((resolve) => { enemy.onload = resolve; });
    // const loadAllay = new Promise((resolve) => { allay.onload = resolve; });

    // // Esperar a que todas las imágenes se carguen
    // Promise.all([loadBackground, loadEnemy, loadAllay]).then(() => {
    //     screen.drawImage(background, 0, 0);
    //     screen.drawImage(enemy, x - 126, 64);
    //     screen.drawImage(allay, -64, y - 32);
    // }).catch((error) => {
    //     console.error("Error al cargar una o más imágenes:", error);
    // });
// }