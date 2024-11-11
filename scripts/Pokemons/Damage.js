import { DrawAll } from "../../init.js";
import { Data, Random, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";

const physical = "Physical";

export function doDamage(move) {
  var allay = Data.ActualAllayPokemon;
  var enemy = Data.ActualEnemyPokemon;

  const Level = allay.lvl;
  const Power = move.power;

  const A = move.category == physical ? allay.attack : allay.spAtk;
  const D = move.category == physical ? allay.defense : enemy.spDef;

  const efficacy = calculateAttackEfficacy(move.type, enemy);
  const crit = Random() < 0.06 ? 2 : 1;

  const STAB = allay.type1 == move.type || allay.type2 == move.type ? 1.5 : 1;

  const random = RandomRange(85, 100) / 100;

  move.pp -= 1;

  var stats = {
    Level: Level,
    Power: Power,
    A: A,
    D: D,
    efficacy: efficacy,
    crit: crit,
    STAB: STAB,
    random: random,
  };
  
  console.log("Stats: ")
  console.log(stats);

  var damage = ((((2 * Level) / 20 + 2) * Power * (A / D)) / 50) + 2;

  damage = damage * STAB * crit * random * efficacy;

  enemy.hp -= damage;

  console.log("Damage: " + damage);

  DrawAll();
}
