export class Sprite {
  //==============================
  // Constructor
  //==============================

  constructor(path, screen, x, y) {
    this.image = new Image();
    this.image.src = path;
    this.screen = screen;
    this.x = x;
    this.y = y;

    this.defaultPath = path; // Guarda la ruta original del sprite

    // Dibuja el sprite
    this.drawSprite();
  }

  //==============================
  // Funciones
  //==============================

  // Comprueba si la imagen ha sido cargada
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

  // Dibuja el sprite en la pantalla
  draw() {
    this.screen.drawImage(this.image, this.x, this.y);
  }

  // Dibuja el sprite en la pantalla cuando la imagen se carga
  drawSprite() {
    this.onload()
      .then(() => {
        this.screen.drawImage(this.image, this.x, this.y);
      })
      .catch((error) => {
        console.error("Error al cargar el sprite del Pokémon:", error);
      });
  }
}
