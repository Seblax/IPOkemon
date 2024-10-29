var ctx;
var x,y;

export function DrawBackground() {
    const canvas = document.querySelector(".background-canvas");


    if (!canvas) {
        console.error("No se encontró ningún elemento con la clase 'background-canvas'.");
        return;
    }

    ctx = canvas.getContext("2d");

    const parent = canvas.parentElement;
    
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    x = canvas.width;
    y = canvas.height;

    if (!ctx) {
        console.error("No se pudo obtener el contexto 2D del canvas.");
        return;
    }

    SetBackgroundSprites();
}

function SetBackgroundSprites() {
    const path = "/Backgrounds/";

    const background = new Image();
    const enemy = new Image();
    const allay = new Image();

    background.src = path + "0_background.png";
    enemy.src = path + "0_enemy.png";
    allay.src = path + "0_allay.png";

    // Crear promesas para cada imagen
    const loadBackground = new Promise((resolve) => { background.onload = resolve; });
    const loadEnemy = new Promise((resolve) => { enemy.onload = resolve; });
    const loadAllay = new Promise((resolve) => { allay.onload = resolve; });

    // Esperar a que todas las imágenes se carguen
    Promise.all([loadBackground, loadEnemy, loadAllay]).then(() => {
        ctx.drawImage(background, 0, 0);
        ctx.drawImage(enemy, x - 126, 64);
        ctx.drawImage(allay, -64, y - 32);
    }).catch((error) => {
        console.error("Error al cargar una o más imágenes:", error);
    });
}