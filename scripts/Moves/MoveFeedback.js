import { Sprite } from "../utils/Sprite.js";
import { Screen } from "../utils/Screen.js";
import { Data } from "../utils/Data.js";
import { Config } from "../utils/Config.js";

var pos;

export class MoveFeedback {
  constructor() {
    this.screen = new Screen(".feedback-canvas"); // Canvas para el feedback visual
    this.duration; // Duración del feedback
    this.opacity = 1; // Opacidad inicial
  }

  /**
   * Muestra un mensaje de feedback visual en pantalla.
   * @param {string} efficacy - Tipo de feedback (e.g., "very_effective", "critical_hit").
   * @param {int} x
   */
  showFeedback(efficacy, enemy) {
    if (efficacy == 1) {
      return;
    }

    pos = enemy ? Config.MoveFeedbackEnemy : Config.MoveFeedbackAllay;

    const feedbackPath = `assets/sprites/ui/feedback/${efficacy}.png`;
    const feedbackSprite = new Sprite(feedbackPath, this.screen, pos.x, pos.y);

    // Resetea opacidad
    this.opacity = 0;
    this.duration = 0;

    const FeedbackCallback = (deltaTime) => {
      this.screen.clear();
      this.duration++;
      this.screen.ctx.globalAlpha = this.opacity;

      if (this.duration < 0.25 * 60) {
        feedbackSprite.draw();
        feedbackSprite.y -= 0.5 + (this.duration / (0.25 * 60));
        this.opacity = this.duration / (0.25 * 60);
      } else if (this.duration < 60) {
        feedbackSprite.draw();
      } else {
        Data.AnimationManager.remove(FeedbackCallback); // Termina esta animación
      }
    };

    // Añade la animación al AnimationManager
    Data.AnimationManager.add(FeedbackCallback);
  }

  showCrit(crit, enemy) {
    if (crit == 1) {
      return;
    }

    const critPath = `assets/sprites/ui/feedback/crit.png`;
    pos = enemy ? Config.MoveFeedbackEnemy : Config.MoveFeedbackAllay;
    const critSprite = new Sprite(critPath, this.screen, pos.x, pos.y);

    // Resetea opacidad
    this.opacity = 0;
    this.duration = 0;

    const CritCallback = (deltaTime) => {
      this.duration++;
      this.screen.ctx.globalAlpha = this.opacity;

      if (this.duration < 0.25 * 60) {
        critSprite.draw();
        critSprite.y -= 0.5 + (this.duration / (0.25 * 60));
        this.opacity = this.duration / (0.25 * 60);
      } else if (this.duration < 60) {
        critSprite.draw();
      } else {
        this.screen.clear();
        Data.AnimationManager.remove(FeedbackCallback); // Termina esta animación
      }
    };

    // Añade la animación al AnimationManager
    Data.AnimationManager.add(CritCallback);
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
