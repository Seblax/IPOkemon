import { getMovesSet } from "./Move.js";
import { Data } from "./utils/Data.js";

export class PokemonTeam {
  constructor() {
    this.team = [];
  }

  // Método para seleccionar aleatoriamente un Pokémon
  getRandomPokemon(pokemonList) {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex];
  }

  // Método para generar un equipo de 6 Pokémon
  async generateTeam() {
    const allPokemon = await Data.PokemonData;

    while (this.team.length < 6) {
      const randomPokemon = this.getRandomPokemon(allPokemon);
      if (!this.team.includes(randomPokemon)) {
        randomPokemon.moveSet = [];
        getMovesSet(randomPokemon);
        this.team.push(randomPokemon);
      }
    }
    return this.team;
  }

  setEnemy() {
    this.team.forEach((pokemon, index) => {
      pokemon.enemy = true;
    });
  }

  // Método para mostrar el equipo
  displayTeam() {
    this.team.forEach((pokemon, index) => {
      console.log(`${index + 1}.-`);
      console.log(pokemon.getStats());
    });
  }
}
