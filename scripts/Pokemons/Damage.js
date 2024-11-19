import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";

const physical = "Physical";

export function doDamage(move, atkPokemon, defPokemon) {

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

  if(defPokemon.enemy){
    Data.uiEnemy.DrawHpBar(oldHp);  
  } else{
    Data.uiAllay.DrawHpBar(oldHp);  
  }


  DrawMoveSet(Data.ActualAllayPokemon);
}
