import { Move } from "../Move.js";
import { Pokemon } from "../Pokemon.js";

export async function Parser(path) {
  const response = await fetch(path);
  const csvData = await response.text();

  const rows = csvData.split("\n"); // Divide el CSV en filas

  // Procesa cada fila del CSV
  return rows.slice(1).map((row) => {
    const values = row.trim().split(";"); // Divide cada fila en valores
    return values; // Si la fila no coincide con el encabezado, la ignoramos
  });
}

export async function loadPokemonFromCSV() {
  var pokemons = await Parser("../data/pokemon_data.csv");

  return pokemons.map((values) => {
    return new Pokemon(
      values[0],
      values[1],
      values[2],
      values[3],
      values[4],
      values[5],
      values[6],
      values[7],
      values[8],
      values[9],
      values[10],
      values[11],
      values[12]
    );
  }); // Filtra las filas nulas
}

export async function loadMovesFromCSV() {
  var moves = await Parser("../data/pokemon_moves_data.csv");

  return moves.map((values) => {
    return new Move(
      values[0],
      values[1],
      values[2],
      values[3],
      values[4],
      values[5],
      values[6]
    );
  });
}
