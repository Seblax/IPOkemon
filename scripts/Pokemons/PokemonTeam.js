import { getMovesSet } from "../Moves/Move.js";
import { Pokemon } from "./Pokemon.js";
import { Data, RandomZeroTo } from "../utils/Data.js";

export class PokemonTeam {
  //==============================
  // Constructor
  //==============================

  constructor() {
    this.team = [];
  }

  //==============================
  // Funciones
  //==============================

  // Método para seleccionar aleatoriamente un Pokémon
  getRandomPokemon(pokemonList) {
    const randomIndex = RandomZeroTo(pokemonList.length);
    return pokemonList[randomIndex];
  }

  async generateTeam(isEnemy) {
    //Lista con todos los pokemons
    const allPokemon = await Data.PokemonData;

    //Comprueba que el equipo actual
    while (this.team.length < 6) {
      const randomPokemon = this.getRandomPokemon(allPokemon);

      if (!this.team.includes(randomPokemon)) {
        //Creamos el nuevo pokemon
        const newPokemon = Pokemon.copy(randomPokemon);

        //Inicializamos sus stats
        newPokemon.enemy = isEnemy;
        newPokemon.moveSet = [];
        getMovesSet(newPokemon);
        newPokemon.setRandomStats();

        //Lo añadimos al equipo
        this.team.push(newPokemon);
      }
    }
    return Promise.all(this.team);
  }

  // Método para mostrar el equipo
  displayTeam() {
    this.team.forEach((pokemon, index) => {
      console.log(`${index + 1}.-`);
      console.log(pokemon.getStats());
    });
  }
}