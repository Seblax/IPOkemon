import { Pokemon } from "./Pokemon.js";
import { Parser } from "./utils/CSV.js";

export class PokemonTeam {
    
    constructor() {
        this.team = [];
    }

    // Método para cargar Pokémon desde un archivo CSV
    async loadPokemonFromCSV() {
        var pokemons = await Parser("../data/pokemon_data.csv");
    
        return pokemons.map(values => {
            return new Pokemon(
                values[0], values[1], values[2], values[3], values[4],
                values[5], values[6], values[7], values[8], values[9],
                values[10], values[11],values[12]
            );
        }); // Filtra las filas nulas
    }

    // Método para seleccionar aleatoriamente un Pokémon
    getRandomPokemon(pokemonList) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        return pokemonList[randomIndex];
    }

    // Método para generar un equipo de 6 Pokémon
    async generateTeam() {
        const allPokemon = await this.loadPokemonFromCSV();

        while (this.team.length < 6) {
            const randomPokemon = this.getRandomPokemon(allPokemon);
            if (!this.team.includes(randomPokemon)) {
                this.team.push(randomPokemon);
            }
        }
        return this.team;
    }

    setEnemy(){
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