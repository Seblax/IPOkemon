import { Data } from "../utils/Data.js";

export class Move {
  constructor(name, type, category, power, acc, pp, prio) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.power = parseInt(power);
    this.acc = parseFloat(acc);
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

  static copy(move){
    return new Move(move.name, move.type, move.category, move.power, move.acc, move.pp, move.prio);
  }

  toString() {
    // Llama a getStats y formatea las propiedades como cadena
    const stats = this.getStats();
    return `Move: ${stats.Name}\nType: ${stats.Type}\nCategory: ${stats.Category}\nPower: ${stats.Power}\nAccuracy: ${stats.Accuracy}%\nPP: ${stats.PowerPoints}\n`;
  }
}

function getRandomMove(movesList) {
  const randomIndex = Math.floor(Math.random() * movesList.length);
  return Move.copy(movesList[randomIndex]);
}

export async function getMovesSet(pokemon) {
  var movesList = await Data.MovesData;
  let hasTypeMatch = false;

  // Filtrar movimientos que coincidan con el tipo del Pokémon
  const typeMatchingMoves = movesList.filter(
    (move) => move.type === pokemon.type1 || move.type === pokemon.type2
  );

  // Asegurarse de que al menos un movimiento tenga el mismo tipo
  if (typeMatchingMoves.length > 0) {
    const randomTypeMove = getRandomMove(typeMatchingMoves);
    pokemon.moveSet.push(randomTypeMove);
    hasTypeMatch = true;
  }

  // Completar los movimientos restantes hasta tener 4
  while (pokemon.moveSet.length < 4) {
    const randomMove = getRandomMove(movesList);
    if (!pokemon.moveSet.includes(randomMove)) {
      pokemon.moveSet.push(randomMove);
    }
  }
}

