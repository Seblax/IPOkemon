import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomBooleano, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";
import { showCrit, showFeedback } from "../Moves/MoveFeedback.js";

const physical = "Physical";

export function doDamage(move, atkPokemon, defPokemon) {
  const Level = atkPokemon.lvl;
  const Power = move.power;

  const A = move.category === physical ? atkPokemon.attack : atkPokemon.spAtk;
  const D = move.category === physical ? atkPokemon.defense : defPokemon.spDef;

  const efficacy = calculateAttackEfficacy(move.type, defPokemon);
  const crit = Random() < 0.0625 ? 2 : 1;
  const STAB =
    atkPokemon.type1 === move.type || atkPokemon.type2 === move.type ? 1.5 : 1;

  const random = RandomRange(85, 100) / 100;


  let damage = ((((2 * Level) / 20 + 2) * Power * (A / D)) / 50) + 2;
  damage = damage * STAB * crit * random * efficacy;

  // Feedback de efectividad
  showFeedback(efficacy, defPokemon.enemy);
  showCrit(crit, defPokemon.enemy);

  const oldHp = defPokemon.hp;
  defPokemon.hp = Math.max(0, defPokemon.hp - damage);
  return oldHp;

}

let first;
let second;

function PrioMove() {
  var prio = Data.ActualAllayMove.prio - Data.ActualEnemyMove.prio;

  first = Data.ActualAllayMove;
  second = Data.ActualEnemyMove;

  if (prio < 0) {
    first = Data.ActualEnemyMove;
    second = Data.ActualAllayMove;
  }

  return prio == 0;
}

export function SetBattleTurn() {
  let prio = PrioMove();
  var pokemonSpeeds = 0;


  if (prio) {
    pokemonSpeeds = Data.ActualAllayPokemon.speed - Data.ActualEnemyPokemon.speed;
    pokemonSpeeds == 0 ? RandomBooleano() : pokemonSpeeds;
  }

  if (pokemonSpeeds < 0) {
    first = Data.ActualEnemyMove;
    second = Data.ActualAllayMove;

  } else if (pokemonSpeeds > 0) {
    first = Data.ActualAllayMove;
    second = Data.ActualEnemyMove;
  }

  first = first.acc / 100 >= Random() ? first : null;
  second = second.acc / 100 >= Random() ? second : null;

  return {
    First: first,
    Second: second,
    IsEnemy: first == Data.ActualEnemyMove
  };
}