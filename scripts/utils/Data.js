import { loadMovesFromCSV, loadPokemonFromCSV } from "./CSV.js";

export class Data {
  static PokemonData = loadPokemonFromCSV();
  static MovesData = loadMovesFromCSV();
}
