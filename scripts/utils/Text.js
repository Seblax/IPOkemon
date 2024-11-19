export class Text {
  constructor(text, screen, x, y, size, style, align) {
    // Almacenar propiedades
    this.text = text;
    this.screen = screen;
    this.x = x;
    this.y = y;
    this.size = size;
    this.style = style;
    this.align = align;
    this.color = "black";
    this.outline = false;
  }

  /**
   * 
   */
  drawText() {
    this.screen.drawText(this.text, this.x, this.y, this.size, this.style, this.align, this.color, this.outline);
  }

  setColor(color){
    this.color = color; 
    return this
  }

  
  setOutline(outline){
    this.outline = outline; 
    return this
  }

  // Método para actualizar el texto
  setText(newText) {
    this.text = newText;
    return this
  }
}
