import { Data } from "../utils/Data.js";

export class Move {
  constructor(name, type, category, power, acc, pp, prio) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.power = parseInt(power);
    this.acc = parseFloat(acc) / 100;
    this.pp = parseInt(pp);
    this.totalPP = parseInt(pp);
    this.prio = parseInt(prio);
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
      TotalPowerPoints: this.totalPP,
      Prio: this.prio,
    };
  }

  toString() {
    // Llama a getStats y formatea las propiedades como cadena
    const stats = this.getStats();
    return `Move: ${stats.Name}\nType: ${stats.Type}\nCategory: ${stats.Category}\nPower: ${stats.Power}\nAccuracy: ${stats.Accuracy * 100}%\nPP: ${stats.PowerPoints}\nCrit Chance: ${stats.Crit * 100}%`;
  }
}

function getRandomMove(movesList) {
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
