import { Config } from "../utils/Config.js";
import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";
import { Text } from "../utils/Text.js";

// Instancia de Screen para el lienzo donde se dibujan los sprites de movimientos.
const screen = new Screen(".move-set-canvas");
const textScreen = new Screen(".move-set-text-canvas"); // Lienzo específico para el texto de los movimientos.

/**
 * Dibuja el conjunto de movimientos de un Pokémon en la pantalla.
 * @param {object} pokemon - Objeto Pokémon que contiene un conjunto de movimientos.
 */
export function DrawMoveSet(pokemon) {
  var i = 0;
  textScreen.clear(); // Limpia la pantalla de texto antes de redibujar.

  // Itera sobre los movimientos del Pokémon y los dibuja uno por uno.
  pokemon.moveSet.forEach((element) => {
    //Si el movimiento no tiene PP se ejecuta SelectedMove en vez de DrawMove
    element.pp > 0 ? DrawMove(element, i) : OnHoverMove(element, i); // Llama a la función para dibujar un movimiento específico.
    i++;
  });
}

export function SetCanvasMoveSetResolution() {
  textScreen.resolution(20); // Establece la resolución de la pantalla de texto.
}

/**
 * Dibuja un movimiento específico en la pantalla.
 * @param {object} move - Objeto que representa un movimiento del Pokémon.
 * @param {number} id - Índice que determina la posición del movimiento en la interfaz.
 */
export function DrawMove(move, id) {

  var path = GetMoveSprite(move); // Obtiene la ruta del sprite del movimiento.

  // Determina la posición de dibujo basada en el índice del movimiento.
  var pos = Config.MovesSetUI.Move1; // Posición por defecto para el primer movimiento.

  switch (id) {
    default:
    case 0:
      break; // Mantiene la posición por defecto para el primer movimiento.
    case 1:
      pos = Config.MovesSetUI.Move2; // Cambia la posición para el segundo movimiento.
      break;
    case 2:
      pos = Config.MovesSetUI.Move3; // Posición para el tercer movimiento.
      break;
    case 3:
      pos = Config.MovesSetUI.Move4; // Posición para el cuarto movimiento.
      break;
  }

  // Dibuja el sprite del movimiento.
  new Sprite(path, screen, pos.x, pos.y);

  // Dibuja el nombre del movimiento en la pantalla de texto.
  new Text(
    move.name,
    textScreen,
    pos.x + Config.MovesSetUI.name.x, // Ajuste de la posición x basado en la configuración.
    pos.y + Config.MovesSetUI.name.y, // Ajuste de la posición y basado en la configuración.
    16,
    "Pokefont",
    "start"
  ).drawText();

  // Dibuja el texto del total de PP.
  new Text(
    move.totalPP,
    textScreen,
    pos.x + Config.MovesSetUI.PP.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "start"
  ).drawText();

  // Dibuja el texto de los PP actuales con la barra separadora.
  new Text(
    move.pp + "/",
    textScreen,
    pos.x + Config.MovesSetUI.PP.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "right"
  ).drawText();

  // Dibuja la etiqueta "PP".
  new Text(
    "PP",
    textScreen,
    pos.x + Config.MovesSetUI.PP.name.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "start"
  ).drawText();
}

/**
 * Devuelve la ruta al sprite del tipo de movimiento.
 * @param {object} move - Objeto que representa un movimiento del Pokémon.
 * @returns {string} - Ruta al archivo de imagen del sprite del movimiento.
 */
function GetMoveSprite(move) {
  var type = move.type; // Obtiene el tipo del movimiento.
  return "assets/sprites/ui/moves/" + type + ".png"; // Construye la ruta completa del sprite.
}

export function OnHoverMove(move, id) {
  const path = move.pp <= 0 ? "assets/sprites/ui/moves/noPP.png" : "assets/sprites/ui/moves/selected.png"; // Obtiene la ruta del sprite del movimiento.

  // Determina la posición de dibujo basada en el índice del movimiento.
  var pos = Config.MovesSetUI.Move1; // Posición por defecto para el primer movimiento.

  switch (id) {
    default:
    case 0:
      break; // Mantiene la posición por defecto para el primer movimiento.
    case 1:
      pos = Config.MovesSetUI.Move2; // Cambia la posición para el segundo movimiento.
      break;
    case 2:
      pos = Config.MovesSetUI.Move3; // Posición para el tercer movimiento.
      break;
    case 3:
      pos = Config.MovesSetUI.Move4; // Posición para el cuarto movimiento.
      break;
  }

  // Dibuja el sprite del movimiento.
  new Sprite(path, screen, pos.x, pos.y, true);

  // Dibuja el nombre del movimiento en la pantalla de texto.
  new Text(
    move.name,
    textScreen,
    pos.x + Config.MovesSetUI.name.x, // Ajuste de la posición x basado en la configuración.
    pos.y + Config.MovesSetUI.name.y, // Ajuste de la posición y basado en la configuración.
    16,
    "Pokefont",
    "start"
  ).drawText();

  // Dibuja el texto del total de PP.
  new Text(
    move.totalPP,
    textScreen,
    pos.x + Config.MovesSetUI.PP.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "start"
  ).drawText();

  // Dibuja el texto de los PP actuales con la barra separadora.
  new Text(
    move.pp + "/",
    textScreen,
    pos.x + Config.MovesSetUI.PP.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "right"
  ).drawText();

  // Dibuja la etiqueta "PP".
  new Text(
    "PP",
    textScreen,
    pos.x + Config.MovesSetUI.PP.name.x,
    pos.y + Config.MovesSetUI.PP.y,
    16,
    "Pokefont",
    "start"
  ).drawText();
}
