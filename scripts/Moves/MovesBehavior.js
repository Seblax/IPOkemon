import { DrawMove, DrawMoveSet, OnHoverMove } from "../DrawSprites/MoveSetSprites.js";
import { SetBattleTurn } from "../Pokemons/Damage.js";
import { Round } from "../Turn.js";
import { Data, RandomRange } from "../utils/Data.js";

const botones = document.querySelectorAll(".move");

export function moveSetButtons() {
  botones.forEach((boton) => {
    boton.addEventListener("mouseover", () => {
      // Extraemos el número del botón a partir de su clase
      const botonId = parseInt(boton.classList[1]); // Asumimos que la clase sigue el formato "move X", donde X es el número
      mouseHover(botonId - 1);
    });
  });

  botones.forEach((boton) => {
    boton.addEventListener("mouseleave", () => {
      // Extraemos el número del botón a partir de su clase
      const botonId = parseInt(boton.classList[1]); // Asumimos que la clase sigue el formato "move X", donde X es el número
      mouseExit(botonId - 1);
    });
  });

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!Data.YouTurn) {
        return;
      }

      const botonId = parseInt(boton.classList[1]); // Asumimos que la clase sigue el formato "move X", donde X es el número

      Data.ActualAllayMove = Data.ActualAllayPokemon.moveSet[botonId - 1];
      Data.ActualEnemyMove = Data.ActualEnemyPokemon.moveSet[RandomRange(0, 3)];

      //Si el movimiento no tiene PP no se ejecuta ninguna lógica
      if (Data.ActualAllayMove.pp <= 0) {
        return;
      }

      Data.ActualAllayMove.pp -= 1;
      Data.ActualEnemyMove.pp -= 1;

      Round();
      // Actualizar movimientos del atacante
      DrawMoveSet(Data.ActualAllayPokemon);
    });
  });
}

// Función para ejecutar la acción al pasar el ratón
function mouseHover(i) {
  OnHoverMove(Data.ActualAllayPokemon.moveSet[i], i); // Aquí i-1 para que se alinee con los índices si es necesario
}

function mouseExit(i) {
  var move = Data.ActualAllayPokemon.moveSet[i];

  //Si el movimiento no tiene PP no se ejecuta ninguna lógica
  if (move.pp <= 0) {
    return;
  }
  DrawMove(move, i); // Aquí i-1 para que se alinee con los índices si es necesario
}
