export class Screen {
  constructor(canvasSelector) {
    this.canvas = document.querySelector(canvasSelector);
    this.ctx = this.canvas.getContext("2d");

    const parent = this.canvas.parentElement;

    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  drawImage(image, x, y) {
    this.ctx.drawImage(image, x, y);
  }

  drawCanvas(image, x, y) {
    image.onload = () => {
      this.ctx.drawImage(image, x, y, this.canvas.width, this.canvas.height);
    };
  }

  drawText(text, x, y, size, style, align, color, outline) {
    this.ctx.font = `${size}px ${style}`;
    this.ctx.fillStyle = color; // Color del texto
    this.ctx.strokeStyle = 'black';
    this.ctx.textBaseline = "middle"; // Posicionamiento del texto
    this.ctx.textAlign = align; // Posicionamiento del texto
    this.ctx.lineWidth = 2;

    // Dibujar el texto en el canvas
    outline ? this.ctx.strokeText(text, x, size + y) : null ;
    this.ctx.fillText(text, x, size + y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resolution(scale){
    this.canvas.style.width = this.canvas.width + "px";
    this.canvas.style.height = this.canvas.height + "px";

    // Establecer una resolución más alta interna
    this.canvas.width = this.canvas.style.width.replace("px", "") * scale;
    this.canvas.height = this.canvas.style.height.replace("px", "") * scale;

    // Escalar el contexto
    this.ctx.scale(scale, scale); // Ajusta la escala del contexto
    return this;
  }
}
