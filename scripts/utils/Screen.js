export class Screen {
  /**
   * Constructor que inicializa una instancia de `Screen` asociada a un elemento `<canvas>` en el DOM.
   * @param {string} canvasSelector - Selector CSS para identificar el elemento `<canvas>`.
   */
  constructor(canvasSelector) {
    // Selecciona el elemento `<canvas>` y obtiene su contexto 2D.
    this.canvas = document.querySelector(canvasSelector);
    this.ctx = this.canvas.getContext("2d");

    // Ajusta el tamaño del canvas para que coincida con el de su elemento padre.
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  /**
   * Dibuja una imagen en el canvas en la posición especificada.
   * @param {HTMLImageElement} image - Imagen a dibujar.
   * @param {number} x - Posición x en el canvas.
   * @param {number} y - Posición y en el canvas.
   */
  drawImage(image, x, y) {
    this.ctx.drawImage(image, x, y);
  }

  /**
   * Dibuja una imagen en todo el canvas y la redimensiona para que ocupe todo el espacio disponible.
   * @param {HTMLImageElement} image - Imagen a dibujar.
   * @param {number} x - Posición x de la imagen en el canvas.
   * @param {number} y - Posición y de la imagen en el canvas.
   */
  drawCanvas(image, x, y) {
    // Espera a que la imagen se cargue antes de dibujarla.
    image.onload = () => {
      this.ctx.drawImage(image, x, y, this.canvas.width, this.canvas.height);
    };
  }

  /**
   * Dibuja un texto en el canvas en la posición especificada y con opciones de estilo.
   * @param {string} text - Texto a dibujar.
   * @param {number} x - Posición x del texto en el canvas.
   * @param {number} y - Posición y del texto en el canvas.
   * @param {number} size - Tamaño de la fuente en píxeles.
   * @param {string} style - Familia de la fuente.
   * @param {string} align - Alineación del texto (e.g., "start", "center").
   * @param {string} color - Color del texto.
   * @param {boolean} outline - Si se debe dibujar el contorno del texto.
   */
  drawText(text, x, y, size, style, align, color, outline) {
    this.ctx.font = `${size}px ${style}`;
    this.ctx.fillStyle = color; // Establece el color del texto.
    this.ctx.strokeStyle = 'black'; // Color del contorno del texto.
    this.ctx.textBaseline = "middle"; // Posición vertical del texto.
    this.ctx.textAlign = align; // Alineación horizontal del texto.
    this.ctx.lineWidth = 2;

    // Dibuja el contorno del texto si `outline` es verdadero.
    outline ? this.ctx.strokeText(text, x, size + y) : null;
    // Dibuja el texto en la posición especificada.
    this.ctx.fillText(text, x, size + y);
  }

  /**
   * Limpia el contenido del canvas.
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }

    /**
   * Limpia el contenido del canvas.
   */
    rotate(angle) {
      this.ctx.rotate(angle);
    }

  /**
   * Ajusta la resolución interna del canvas para soportar mejor las pantallas de alta densidad de píxeles.
   * @param {number} scale - Factor de escala para la resolución.
   * @returns {Screen} - Retorna la instancia actual para permitir encadenar métodos.
   */
  resolution(scale) {
    // Ajusta el tamaño visual del canvas.
    this.canvas.style.width = this.canvas.width + "px";
    this.canvas.style.height = this.canvas.height + "px";

    // Ajusta la resolución interna del canvas.
    this.canvas.width = this.canvas.style.width.replace("px", "") * scale;
    this.canvas.height = this.canvas.style.height.replace("px", "") * scale;

    // Escala el contexto 2D para mantener proporciones adecuadas.
    this.ctx.scale(scale, scale);
    return this;
  }

  blur(boolean){
    this.ctx.imageSmoothingEnabled = boolean;
    return this;
  }
}
