import { Screen } from "../utils/Screen.js";
import { Sprite } from "../utils/Sprite.js";
import { Text } from "../utils/Text.js";

const screen = new Screen(".move-set-canvas");
const textScreen = new Screen(".move-set-text-canvas");

export function DrawMoveSet(pokemon) {
  var i = 0;
  textScreen.clear();
  textScreen.resolution(20);

  pokemon.moveSet.forEach((element) => {
    DrawMove(element, i);
    i++;
  });
}

function DrawMove(move, id) {
  var path = GetMoveSprite(move);

  var x = 0;
  var y = 0;

  switch (id) {
    default:
    case 0:
      break;
    case 1:
        x = 124 + 4;
      break;
    case 2:
        y = 55 + 7;
      break;
    case 3:
        x = 124 + 4;
        y = 55 + 7;
      break;
  }
  
  new Sprite(path, screen, 2 + x, 5 + y);
  new Text(move.name, textScreen,x+16, y+8, 16, "Pokefont","start").drawText();
  new Text(move.totalPP, textScreen,x+94, y+25, 16, "Pokefont","start").drawText();
  new Text(move.pp + "/", textScreen,x+92, y+25, 16, "Pokefont", "right").drawText();
  
  new Text("PP", textScreen,x+50, y+25, 16, "Pokefont","start").drawText();
}

function GetMoveSprite(move) {
  var type = move.type;
  return "assets/sprites/ui/moves/" + type + ".png";
}
