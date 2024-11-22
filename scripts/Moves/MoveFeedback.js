import { Sprite } from "../utils/Sprite.js";
import { Screen } from "../utils/Screen.js";
import { Data } from "../utils/Data.js";
import { Config } from "../utils/Config.js";

var pos;
var screen = new Screen(".feedback-canvas"); // Canvas para el feedback visual
var duration; // Duración del feedback
var opacity = 1; // Opacidad inicial


/**
 * Muestra un mensaje de feedback visual en pantalla.
 * @param {string} efficacy - Tipo de feedback (e.g., "very_effective", "critical_hit").
 * @param {int} x
 */
export function showFeedback(efficacy, enemy) {
  if (efficacy == 1) {
    return;
  }

  pos = enemy ? Config.MoveFeedbackEnemy : Config.MoveFeedbackAllay;

  const feedbackPath = `assets/sprites/ui/feedback/${efficacy}.png`;
  const feedbackSprite = new Sprite(feedbackPath, screen, pos.x, pos.y);

  // Resetea opacidad
  opacity = 0;
  duration = 0;

  const FeedbackCallback = (deltaTime) => {
    screen.clear();
    duration++;
    screen.ctx.globalAlpha = opacity;

    if (duration < 0.25 * 60) {
      feedbackSprite.draw();
      feedbackSprite.y -= 0.5 + (duration / (0.25 * 60));
      opacity = duration / (0.25 * 60);
    } else if (duration < 60) {
      feedbackSprite.draw();
    } else {
      Data.AnimationManager.remove(FeedbackCallback); // Termina esta animación
    }
  };

  // Añade la animación al AnimationManager
  Data.AnimationManager.add(FeedbackCallback);
}

export function showCrit(crit, enemy) {
  if (crit == 1) {
    return;
  }
  
  pos = enemy ? Config.MoveFeedbackEnemy : Config.MoveFeedbackAllay;
  
  const critPath = `assets/sprites/ui/feedback/crit.png`;
  const screen = new Screen(".crit-or-miss-canvas");
  const critSprite = new Sprite(critPath, screen, pos.x, pos.y);


  // Resetea opacidad
  opacity = 0;
  duration = 0;

  const CritCallback = (deltaTime) => {
    screen.clear();

    duration++;
    screen.ctx.globalAlpha = opacity;

    if (duration < 0.25 * 60) {
      critSprite.draw();
      critSprite.y -= 0.5 + (duration / (0.25 * 60));
      opacity = duration / (0.25 * 60);
    } else if (duration < 60) {
      critSprite.draw();
    } else {
      screen.clear();
      Data.AnimationManager.remove(CritCallback); // Termina esta animación
    }
  };

  // Añade la animación al AnimationManager
  Data.AnimationManager.add(CritCallback);
}

export function showMiss(enemy) {
  pos = enemy ? Config.MoveFeedbackEnemy : Config.MoveFeedbackAllay;
  
  const critPath = `assets/sprites/ui/feedback/miss.png`;
  const screen = new Screen(".crit-or-miss-canvas");
  const critSprite = new Sprite(critPath, screen , pos.x, pos.y);


  // Resetea opacidad
  opacity = 0;
  duration = 0;

  const MissCallback = (deltaTime) => {
    duration++;
    screen.ctx.globalAlpha = opacity;
    screen.clear();

    if (duration < 0.25 * 60) {
      critSprite.draw();
      critSprite.y -= 0.5 + (duration / (0.25 * 60));
      opacity = duration / (0.25 * 60);
    } else if (duration < 60) {
      critSprite.draw();
    } else {
      screen.clear();
      Data.AnimationManager.remove(MissCallback); // Termina esta animación
    }
  };

  // Añade la animación al AnimationManager
  Data.AnimationManager.add(MissCallback);
}