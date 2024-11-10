import { PokemonTeam } from "./PokemonTeam.js";
import { calcTypes } from "./TypeCalcs.js";

export function loadTests() {
    testCalcTypes()
}

async function testCalcTypes() {
    let water = "Water";
    let fire = "Fire";
    let ice = "Ice";
    let normal = "Normal";
    let electric = "Electric";
    let ground = "Ground";
    let badtype = "Amogus";

    const teamAllay = new PokemonTeam();
    await teamAllay.generateTeam(false);
    let pokemon1type = teamAllay.team[0].type1;
    let pokemon2type = teamAllay.team[2].type1;

    let value1 = await calcTypes(water, fire);
    let value2 = await calcTypes(ice, fire);
    let value3 = await calcTypes(ice, normal);
    let value4 = await calcTypes(electric, ground);
    let value5 = await calcTypes(electric, badtype);
    let value6 = await calcTypes(pokemon1type, pokemon2type);
    console.log("(WATER-FIRE) Expected value : x2 | Test Value: x" + value1);
    console.log("(ICE-FIRE) Expected value : x0.5 | Test Value: x" + value2);
    console.log("(ICE-NORMAL) Expected value : x1 | Test Value: x" + value3);
    console.log("(ELECTRIC-GROUND) Expected value : x0 | Test Value: x" + value4);
    console.log("(ELECTRIC-BADTYPE) Expected value : -1 | Test Value: " + value5);
    console.log("(" + pokemon1type + " " + pokemon2type + ") Test Value: " + value6);

}