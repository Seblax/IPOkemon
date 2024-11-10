export class Sprite {
  //==============================
  // Constructor
  //==============================

  constructor(path, screen, x, y, isButton = false) {
    this.image = new Image();
    this.image.src = path;
    this.screen = screen;
    this.x = x;
    this.y = y;
    this.width = 50; // Ancho del sprite (ajústalo según tus necesidades)
    this.height = 50; // Alto del sprite (ajústalo según tus necesidades)
    this.isButton = isButton; // Indica si es un botón que puede reaccionar al ratón

    this.defaultPath = path; // Guarda la ruta original del sprite

    // Si es un botón, añade los eventos de mouse
    if (this.isButton) {
      this.addMouseEvents();
    }

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

  // Verifica si el mouse está sobre el área del sprite
  isMouseOver(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }

  // Agrega los eventos de mouse (mouseover, mouseout)
  addMouseEvents() {
    this.screen.canvas.addEventListener("mousemove", (e) =>
      this.handleMouseMove(e)
    );
    this.screen.canvas.addEventListener("mouseout", () =>
      this.handleMouseOut()
    );
  }

  // Cambia el sprite cuando el mouse está sobre él
  handleMouseMove(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    console.log(mouseX)

    if (this.isMouseOver(mouseX, mouseY)) {
      // Cambia la imagen a un sprite de selección (el que prefieras)
      this.image.src = "assets/sprites/ui/moves/select.png";
    } else {
      this.handleMouseOut();
    }

    this.draw(); // Redibuja el sprite actualizado
  }

  // Restaura el sprite original cuando el mouse sale
  handleMouseOut() {
    this.image.src = this.defaultPath; // Restaura el sprite original
    this.draw(); // Redibuja el sprite restaurado
  }
}
