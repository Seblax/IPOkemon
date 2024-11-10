import { DrawMove, SelectedMove } from "../DrawSprites/MoveSetSprites.js";
import { Data } from "../utils/Data.js";

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
      window.open("https://www.youtube.com/watch?v=gwgLj51eW0U");
    });
  });
}

// Función para ejecutar la acción al pasar el ratón
function mouseHover(i) {
  SelectedMove(Data.ActualPokemon.moveSet[i], i); // Aquí i-1 para que se alinee con los índices si es necesario
}

function mouseExit(i) {
  DrawMove(Data.ActualPokemon.moveSet[i], i); // Aquí i-1 para que se alinee con los índices si es necesario
}
