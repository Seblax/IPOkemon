import { Data, RandomZeroTo } from "./Data.js";

const sound = document.getElementById("ost"); // Obtiene el elemento de audio del DOM con el id "ost", que se usará para controlar la música.
const button = document.getElementById("musicButton"); // Obtiene el botón de control de música del DOM, con el id "musicButton".
var _playing = false; // Variable de estado que indica si la música está en reproducción (true) o en pausa (false).

// Función que configura la música de batalla, seleccionando una canción aleatoria de la carpeta "fight".
export function SetBattleMusic() {
  Data.Music = "../assets/music/fight/" + RandomZeroTo(9) + "_fight.ogg";
}

export function PlayBattleMusic() {
  SetBattleMusic();
  sound.play();
}

// Función que gestiona la reproducción de la música.
export function Music() {
  sound.src = Data.Music; // Establece la fuente de audio (`src`) al valor de `Data.Music`.

  // Define el comportamiento cuando el usuario hace clic en el botón de música.
  button.onclick = function () {
    _playing ? PlayMusic() : PauseMusic(); // Si la música está reproduciéndose, se pausa, si está pausada, se reproduce.
    _playing = !_playing; // Cambia el estado de `_playing` (de reproducción a pausa o viceversa).
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

  ChangeButton(_playing);
}

// Función para pausar la música.
function PauseMusic() {
  sound.pause();
  ChangeButton(_playing);
}

// Función para cambiar el estado del botón de música (cambiar su clase CSS).
function ChangeButton() {
  var off = "musicButtonOff"; // Clase CSS para cuando la música está pausada.
  var on = "musicButtonOn"; // Clase CSS para cuando la música está reproduciéndose.
  var l = button.classList; // Obtiene la lista de clases del botón.

  // Si la música está reproduciéndose, cambia la clase del botón a "musicButtonOn" y remueve "musicButtonOff".
  if (_playing) {
    l.remove(off);
    l.add(on);
  } else {
    // Si la música está pausada, hace lo contrario: cambia la clase a "musicButtonOff".
    l.remove(on);
    l.add(off);
  }
}
