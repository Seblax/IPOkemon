import { DrawMove, SelectedMove } from "../DrawSprites/MoveSetSprites.js";
import { PokemonUI } from "../DrawSprites/PokemonUI.js";
import { doDamage } from "../Pokemons/Damage.js";
import { calculateAttackEfficacy } from "../Pokemons/TypeChart.js";
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
      const botonId = parseInt(boton.classList[1]); // Asumimos que la clase sigue el formato "move X", donde X es el número
      
      var move = Data.ActualAllayPokemon.moveSet[botonId-1];      
      if(move.pp <= 0){
        return;
      }
      doDamage(move);
    });
  });
}

// Función para ejecutar la acción al pasar el ratón
function mouseHover(i) {
  SelectedMove(Data.ActualAllayPokemon.moveSet[i], i); // Aquí i-1 para que se alinee con los índices si es necesario
}

function mouseExit(i) {
  var move = Data.ActualAllayPokemon.moveSet[i];
  if(move.pp <= 0){
    return;
  }
  DrawMove(move, i); // Aquí i-1 para que se alinee con los índices si es necesario
}
