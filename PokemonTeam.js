class PokemonTeam {
    
    constructor() {
        this.team = [];
    }

      // Método para cargar Pokémon desde un archivo CSV
      async loadPokemonFromCSV() {
        const response = await fetch("../data/pokemon_data.csv");
        const csvData = await response.text();
        const rows = csvData.split('\n'); // Divide el CSV en filas
        const header = rows[0].split(';'); // Obtiene el encabezado (primera fila)

        // Procesa cada fila del CSV
        return rows.slice(1).map(row => {
            const values = row.split(';'); // Divide cada fila en valores
            if (values.length !== header.length) {
                console.error(`Fila con longitud incorrecta: ${row}`);
                return null; // Si la fila no coincide con el encabezado, la ignoramos
            }
            // Crea una instancia de Pokémon a partir de los valores
            return new Pokemon(
                values[0], values[1], Math.random() > 0.5, values[2], values[3], values[4],
                values[5], values[6], values[7], values[8], values[9],
                values[10], values[11],values[12]
            );
        }).filter(pokemon => pokemon !== null); // Filtra las filas nulas
    }

    // Método para seleccionar aleatoriamente un Pokémon
    getRandomPokemon(pokemonList) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        return pokemonList[randomIndex];
    }

    // Método para generar un equipo de 6 Pokémon
    async generateTeam() {
        const allPokemon = await this.loadPokemonFromCSV("../data/pokemon_data.csv");

        while (this.team.length < 6) {
            const randomPokemon = this.getRandomPokemon(allPokemon);
            if (!this.team.includes(randomPokemon)) {
                this.team.push(randomPokemon);
            }
        }
        return this.team;
    }

    // Método para mostrar el equipo
    displayTeam() {
        this.team.forEach((pokemon, index) => {
            console.log(`${index + 1}.-`);  
            console.log(pokemon.getStats());
        });
    }
}