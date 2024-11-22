import { Config } from "./Config.js";
import { Data, RandomZeroTo } from "./Data.js";

const sound = document.getElementById("ost"); // Obtiene el elemento de audio del DOM con el id "ost", que se usará para controlar la música.
const button = document.getElementById("musicButton"); // Obtiene el botón de control de música del DOM, con el id "musicButton".

// Función que configura la música de batalla, seleccionando una canción aleatoria de la carpeta "fight".
export function SetBattleMusic() {
  Data.Music = "../assets/music/fight/" + RandomZeroTo(9) + "_fight.ogg";
}

export function PlayBattleMusic() {
  SetBattleMusic();
  if (!Config.isMuted) sound.play().catch(function (error) {
    console.log("No se pudo reproducir la música: ", error);
  });;
}

// Función que gestiona la reproducción de la música.
export function Music() {
  sound.src = Data.Music; // Establece la fuente de audio (`src`) al valor de `Data.Music`.

  // Define el comportamiento cuando el usuario hace clic en el botón de música.
  button.onclick = function () {
    Config.isMuted = !Config.isMuted;
    !Config.isMuted ? PlayMusic() : PauseMusic(); // Si la música está reproduciéndose, se pausa, si está pausada, se reproduce.
     // Cambia el estado de `isMuted` (de reproducción a pausa o viceversa).
  };

  // Establece un evento para que, cuando la música termine, se reinicie y se vuelva a reproducir.
  sound.addEventListener("ended", function () {
    sound.currentTime = 0;
    sound.play();
  });
}

// Función para reproducir la música.
function PlayMusic() {
  // Intenta reproducir la música. Si hay un error, se captura y se muestra un mensaje de error.
  sound.play().catch(function (error) {
    console.log("No se pudo reproducir la música: ", error);
  });

  ChangeButton(Config.isMuted);
}

// Función para pausar la música.
function PauseMusic() {
  sound.pause();
  ChangeButton(Config.isMuted);
}

// Función para cambiar el estado del botón de música (cambiar su clase CSS).
function ChangeButton() {
  var off = "musicButtonOff"; // Clase CSS para cuando la música está pausada.
  var on = "musicButtonOn"; // Clase CSS para cuando la música está reproduciéndose.
  var l = button.classList; // Obtiene la lista de clases del botón.

  // Si la música está reproduciéndose, cambia la clase del botón a "musicButtonOff" y remueve "musicButtonOn".
  if (Config.isMuted) {
    l.remove(on);
    l.add(off);
  } else {
    // Si la música está pausada, hace lo contrario: cambia la clase a "musicButtonOn".
    l.remove(off);
    l.add(on);
  }
}
