export class Data {
  static PokemonData;
  static MovesData;
  static Music;
}

export function RandomZeroTo(i){
  return Math.floor(Math.random() * i);
}

export function Random(){
  return Math.random();
}

export function RandomRange(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}