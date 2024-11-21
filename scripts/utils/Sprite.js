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
    this.draw();
  }

  //==============================
  // Funciones
  //==============================

  // Dibuja el sprite en la pantalla
  draw() {
    this.screen.drawImage(this.image, this.x, this.y);
  }
}
