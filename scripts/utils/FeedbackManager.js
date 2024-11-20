import { Sprite } from "../utils/Sprite.js";
import { Screen } from "../utils/Screen.js";
import { Data } from "../utils/Data.js";

export class FeedbackManager {
  constructor() {
    this.screen = new Screen(".feedback-canvas"); // Canvas para el feedback visual
    this.activeFeedback = null; // Sprite activo
    this.duration = 1500; // Duración del feedback (en ms)
    this.opacity = 1; // Opacidad inicial
  }

  /**
   * Muestra un mensaje de feedback visual en pantalla.
   * @param {string} type - Tipo de feedback (e.g., "very_effective", "critical_hit").
   * @param {int} x
   */
  showFeedback(type) {
    const path = `assets/sprites/ui/feedback/${type}.png`;
    // const path = `assets/sprites/ui/feedback/MuyEficaz_x2.png`;
    if (type === "MuyEficaz_x2" | type === "MuyEficaz_x4" ) {
      this.activeFeedback = new Sprite(path, this.screen, 70,15); // Posición centrada
    }else {
      this.activeFeedback = new Sprite(path, this.screen, 90,15); // Posición centrada
    }

    
    // Resetea opacidad
    this.opacity = 1;

    // Añade la animación al AnimationManager
    Data.AnimationManager.add(this.animateFeedback.bind(this));
  }

  /**
   * Lógica de animación para la opacidad y desaparición del mensaje.
   * @param {number} deltaTime - Tiempo transcurrido desde el último frame.
   */
  animateFeedback(deltaTime) {
    if (!this.activeFeedback) return;

    // Limpiar canvas y ajustar opacidad
    this.screen.clear();
    this.screen.ctx.globalAlpha = this.opacity;

    // Dibujar el sprite activo
    this.activeFeedback.draw();

    // Reducir gradualmente la opacidad
    this.opacity -= deltaTime / this.duration;

    // Cuando la opacidad llega a 0, remueve la animación
    if (this.opacity <= 0) {
      this.screen.ctx.globalAlpha = 1; // Restaurar opacidad
      Data.AnimationManager.remove(this.animateFeedback.bind(this));
      this.activeFeedback = null;
    }
  }
}
