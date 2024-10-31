export class Sprite {
    constructor(path, screen, x, y) {
        this.image = new Image();
        this.image.src = path;
        this.screen = screen;
        this.x = x; // Guardar la posición x
        this.y = y; // Guardar la posición y
        
        this.drawSprite();
    }

    onload() {
        return new Promise((resolve, reject) => {
            this.image.onload = () => {
                resolve(this); // Resuelve la promesa con la instancia del sprite
            };
            this.image.onerror = (error) => {
                reject(new Error(`Error al cargar la imagen: ${error}`));
            };
        });
    }

    draw() {
        this.screen.drawImage(this.image, this.x, this.y);
    }

    drawSprite() {
        // Cargar la imagen y dibujarla una vez que se haya cargado
        this.onload().then(() => {
            this.screen.drawImage(this.image, this.x, this.y);
        }).catch((error) => {
            console.error("Error al cargar el sprite del Pokémon:", error);
        });
    }
}
