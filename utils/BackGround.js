import { Screen } from "./Canvas.js";

var screen;
var x,y;

export function DrawBackground() {
    screen = new Screen(".background-canvas");

    x = screen.canvas.width;
    y = screen.canvas.height;

    SetBackgroundSprites();
}

function SetBackgroundSprites() {
    const path = "/Backgrounds/";

    const background = new Image();
    const enemy = new Image();
    const allay = new Image();

    const index = Math.floor(Math.random() * 34);

    background.src = path + index + "_background.png";
    enemy.src = path + index + "_enemy.png";
    allay.src = path + index + "_allay.png";

    // Crear promesas para cada imagen
    const loadBackground = new Promise((resolve) => { background.onload = resolve; });
    const loadEnemy = new Promise((resolve) => { enemy.onload = resolve; });
    const loadAllay = new Promise((resolve) => { allay.onload = resolve; });

    // Esperar a que todas las imágenes se carguen
    Promise.all([loadBackground, loadEnemy, loadAllay]).then(() => {
        screen.drawImage(background, 0, 0);
        screen.drawImage(enemy, x - 126, 64);
        screen.drawImage(allay, -64, y - 32);
    }).catch((error) => {
        console.error("Error al cargar una o más imágenes:", error);
    });
}