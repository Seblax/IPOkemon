import { getMovesSet, Move } from "../Moves/Move.js";
import { Pokemon } from "../Pokemons/Pokemon.js";
import { PokemonTeam } from "../Pokemons/PokemonTeam.js";
import { Data, RandomZeroTo } from "../utils/Data.js";

export async function Test1() {
    const teamAllay = new PokemonTeam();
    await teamAllay.generateTeam();

    var allay = Pokemon.copy(Data.PokemonData[445 - 2]);
    var enemy = Pokemon.copy(Data.PokemonData[413 - 2]);
    enemy.enemy = true;

    var move4 = Move.copy(Data.MovesData[180 - 2]);
    var move025 = Move.copy(Data.MovesData[20 - 2]);
    var move05 = Move.copy(Data.MovesData[3 - 2]);
    var move2 = Move.copy(Data.MovesData[114 - 2]);

    var moveEnemy = Move.copy(Data.MovesData[83 - 2]);

    move4.name = "x4";
    move2.name = "x2";
    move05.name = "x0.5";
    move025.name = "x0.25";

    move4.power = 40;
    move2.power = 40;
    move05.power = 40;
    move025.power = 40;

    moveEnemy.power = 1;

    allay.moveSet = [
        Move.copy(move4),
        Move.copy(move2),
        Move.copy(move05),
        Move.copy(move025),
    ]

    enemy.moveSet = [
        Move.copy(moveEnemy),
        Move.copy(moveEnemy),
        Move.copy(moveEnemy),
        Move.copy(moveEnemy)
    ]



    Data.ActualAllayPokemon = allay;
    Data.ActualEnemyPokemon = enemy;
}



export function Test2() {
    var allay = Pokemon.copy(Data.PokemonData[103 - 2]);
    var enemy = Pokemon.copy(Data.PokemonData[118 - 2]);
    enemy.enemy = true;

    var move4 = Move.copy(Data.MovesData[73 - 2]);
    var move3 = Move.copy(Data.MovesData[136 - 2]);
    var move2 = Move.copy(Data.MovesData[165 - 2]);
    var move1 = Move.copy(Data.MovesData[208 - 2]);

    move4.totalPP = 1;
    move3.totalPP = 1;
    move2.totalPP = 1;

    move4.pp = 1;
    move3.pp = 1;
    move2.pp = 1;


    var moveEnemy = Move.copy(Data.MovesData[2 - 2]);

    allay.moveSet = [
        Move.copy(move4),
        Move.copy(move3),
        Move.copy(move2),
        Move.copy(move1),
    ]

    enemy.moveSet = [
        Move.copy(moveEnemy),
        Move.copy(moveEnemy),
        Move.copy(moveEnemy),
        Move.copy(moveEnemy)
    ]


    Data.ActualAllayPokemon = allay;
    Data.ActualEnemyPokemon = enemy;
}



export async function Test3() {
    var allay = null;

    while (allay == null) {
        var pokemon = Pokemon.copy(Data.PokemonData[RandomZeroTo(735)])
        if (pokemon.mega) {
            allay = pokemon;
        }
    }

    var enemy = Pokemon.copy(Data.PokemonData[RandomZeroTo(735)]);
    allay.setRandomStats();
    enemy.setRandomStats();

    getMovesSet(allay);
    getMovesSet(enemy);

    enemy.enemy = true;
    enemy.shiny = true;

    Data.ActualAllayPokemon = allay;
    Data.ActualEnemyPokemon = enemy;
}

export async function Test4() {
    var allay = Pokemon.copy(Data.PokemonData[232 - 2]);
    var enemy = Pokemon.copy(Data.PokemonData[436 - 2]);

    enemy.enemy = true;

    var moveSinPrio = Move.copy(Data.MovesData[2 - 2]);
    var moveConPrio = Move.copy(Data.MovesData[8 - 2]);

    var moveEnemy = Move.copy(Data.MovesData[83 - 2]);

    moveSinPrio.name = "Sin Prioridad";
    moveConPrio.name = "Prioridad";

    moveSinPrio.power = 1;
    moveConPrio.power = 100000;

    moveConPrio.prio = 1;
    moveSinPrio.prio = 0;

    
    allay.moveSet = [
        Move.copy(moveSinPrio),
        Move.copy(moveSinPrio),
        Move.copy(moveSinPrio),
        Move.copy(moveConPrio),
    ]

    enemy.moveSet = [
        Move.copy(moveSinPrio),
        Move.copy(moveSinPrio),
        Move.copy(moveSinPrio),
        Move.copy(moveSinPrio),
    ]

    Data.ActualAllayPokemon = allay;
    Data.ActualEnemyPokemon = enemy;
}


export async function Test5() {
    var allay = Pokemon.copy(Data.PokemonData[736 - 2])
    var enemy = Pokemon.copy(Data.PokemonData[736 - 2]);

    allay.setRandomStats();
    enemy.setRandomStats();

    var move = Move.copy(Data.MovesData[14 - 2]);
    move.type = "unknown";

    allay.moveSet = [
        move,
        move,
        move,
        move,
    ]

    enemy.moveSet = [
        move,
        move,
        move,
        move
    ]

    enemy.enemy = true;
    enemy.shiny = true;

    Data.ActualAllayPokemon = allay;
    Data.ActualEnemyPokemon = enemy;
}