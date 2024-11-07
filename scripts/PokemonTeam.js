import { getMovesSet } from "./Moves/Move.js";
import { Pokemon } from "./Pokemon.js";
import { Data, RandomRange } from "./utils/Data.js";

export class PokemonTeam {
  constructor() {
    this.team = [];
  }

  // Método para seleccionar aleatoriamente un Pokémon
  getRandomPokemon(pokemonList) {
    const randomIndex = RandomRange(pokemonList.length);
    return pokemonList[randomIndex];
  }

  // Método para generar un equipo de 6 Pokémon
  async generateTeam() {
    await generateTeam(false);
  }

  async generateTeam(isEnemy) {
    const allPokemon = await Data.PokemonData;
    
    while (this.team.length < 6) {
      const randomPokemon = this.getRandomPokemon(allPokemon);
      if (!this.team.includes(randomPokemon)) {
        const newPokemon = Pokemon.copy(Pokemon.copy(randomPokemon));
        
        newPokemon.enemy = isEnemy;
        newPokemon.moveSet = [];
        
        getMovesSet(newPokemon);
        
        this.team.push(newPokemon);
      }
    }
    return  Promise.all(this.team);
  }

  // Método para mostrar el equipo
  displayTeam() {
    this.team.forEach((pokemon, index) => {
      console.log(`${index + 1}.-`);
      console.log(pokemon.getStats());
    });
  }
}
