import { Data } from "./Data.js";

const sound = document.getElementById("ost"); 
const button = document.getElementById("musicButton");
var _playing = true;

export function SetBattleMusic() {
  Data.Music =
    "../assets/music/fight/" + Math.floor(Math.random() * 8) + "_fight.ogg";
}

export function Music() {
  sound.src = Data.Music;

  button.onclick = function () {
    _playing ? Play() : Pause();
    _playing = !_playing;
  };

  // Configuramos la música para que se reinicie al terminar
  sound.addEventListener("ended", function () {
    sound.currentTime = 0; // Reinicia la música al inicio
    sound.play(); // Reproduce nuevamente
  });
}

function Play() {
  sound.play().catch(function (error) {
    console.log("No se pudo reproducir la música: ", error);
  });

  ChangeButton(_playing);
}

function Pause() {
  sound.pause();
  ChangeButton(_playing);
}

function ChangeButton(){
  var off = "musicButtonOff";
  var on = "musicButtonOn";
  var l = button.classList;

  if(_playing){
    l.remove(off);
    l.add(on)

  }else{
    l.remove(on);
    l.add(off)    
  }
}