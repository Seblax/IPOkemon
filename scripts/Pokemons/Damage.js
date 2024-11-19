import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomBooleano, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";

const physical = "Physical";

function doDamage(move, atkPokemon, defPokemon) {

  const Level = atkPokemon.lvl;
  const Power = move.power;

  const A = move.category == physical ? atkPokemon.attack : atkPokemon.spAtk;
  const D = move.category == physical ? atkPokemon.defense : defPokemon.spDef;

  const efficacy = calculateAttackEfficacy(move.type, defPokemon);
  const crit = Random() < 0.06 ? 2 : 1;

  const STAB = atkPokemon.type1 == move.type || atkPokemon.type2 == move.type ? 1.5 : 1;

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


  var damage = ((((2 * Level) / 20 + 2) * Power * (A / D)) / 50) + 2;

  damage = damage * STAB * crit * random * efficacy;

  var oldHp = defPokemon.hp;
  defPokemon.hp -= damage;

  if (defPokemon.enemy) {
    Data.UIEnemy.DrawHpBar(oldHp);
  } else {
    Data.UIAllay.DrawHpBar(oldHp);
  }


  DrawMoveSet(Data.ActualAllayPokemon);
}

let first;
let second;

function PrioMove(moveAllay, moveEnemy) {
  var prio = moveAllay.prio - moveEnemy.prio;

  first = moveAllay;
  second = moveEnemy;
  
  if (prio > 0) {
    first = moveEnemy;
    second = moveAllay;
  }
  
  return prio == 0;
}

export function BattleBehavior(moveAllay, moveEnemy) {
  let moves = PrioMove(moveAllay, moveEnemy);
  var pokemonSpeeds = 0;


  if (moves) {
    pokemonSpeeds = Data.ActualAllayPokemon.speed - Data.ActualEnemyPokemon.speed;
    pokemonSpeeds == 0 ? RandomBooleano() : pokemonSpeeds;
  }

  if (pokemonSpeeds < 0) {
    first = moveEnemy;
    second = moveAllay;

  } else if (pokemonSpeeds > 0) {
    first = moveAllay;
    second = moveEnemy;
  }

  first  = first.acc/ 100 >= Random() ? first : null;
  second = second.acc/ 100 >= Random() ? second : null;

  if(first == moveAllay){
    doDamage(moveAllay, Data.ActualAllayPokemon, Data.ActualEnemyPokemon);
    console.log(`${Data.ActualAllayPokemon.name} te ha metido un  ${first}`);

  }else if (first == moveEnemy){
    console.log(`${Data.ActualEnemyPokemon.name} te ha metido un  ${first}`);

    doDamage(moveEnemy, Data.ActualEnemyPokemon, Data.ActualAllayPokemon);
  }else{
    console.log(`${first} : ha fallao.`);
  }
  // return res;
}