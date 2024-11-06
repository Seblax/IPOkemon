import { Data } from "./utils/Data.js";

export class Move {
  constructor(name, type, category, power, acc, pp, prob) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.power = parseInt(power);
    this.acc = parseFloat(acc) / 100;
    this.pp = parseInt(pp);
    this.prob = prob == "-" ? 0 : parseFloat(prob) / 100;
  }

  // Método para mostrar estadísticas completas
  getStats() {
    return {
      Name: this.name,
      Type: this.type,
      Category: this.category,
      Power: this.power,
      Accuracy: this.acc,
      PowerPoints: this.pp,
      Crit: this.prob,
    };
  }
}

async function getRandomMove(movesList) {
  const randomIndex = Math.floor(Math.random() * movesList.length);
  return movesList[randomIndex];
}

export async function getMovesSet(pokemon) {
  var movesList = await Data.MovesData;
  while (pokemon.moveSet.length < 4) {
    const randomMove = getRandomMove(movesList);
    if (!pokemon.moveSet.includes(randomMove)) {
      pokemon.moveSet.push(randomMove);
    }
  }
}
