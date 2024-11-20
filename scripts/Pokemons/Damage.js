import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomBooleano, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";
import { FeedbackManager } from "../utils/FeedbackManager.js"
const physical = "Physical";
const feedbackManager = new FeedbackManager();

function doDamage(move, atkPokemon, defPokemon) {

  const Level = atkPokemon.lvl;
  const Power = move.power;

  const A = move.category === physical ? atkPokemon.attack : atkPokemon.spAtk;
  const D = move.category === physical ? atkPokemon.defense : defPokemon.spDef;

  const efficacy = calculateAttackEfficacy(move.type, defPokemon);
  const crit = Random() < 0.06 ? 2 : 1;
  const STAB =
    atkPokemon.type1 === move.type || atkPokemon.type2 === move.type ? 1.5 : 1;

  const random = RandomRange(85, 100) / 100;
  move.pp -= 1;

  // Si falla el ataque
  if (Random() > move.acc) {
    feedbackManager.showFeedback("miss");
    return;
  }

  let damage = ((((2 * Level) / 20 + 2) * Power * (A / D)) / 50) + 2;
  damage = damage * STAB * crit * random * efficacy;

  // Feedback de efectividad
  if (efficacy === 2) {
    feedbackManager.showFeedback("MuyEficaz_x2");
  }else if (efficacy === 4){
    feedbackManager.showFeedback("MuyEficaz_x4");
  }else if (efficacy === 0.5) {
    feedbackManager.showFeedback("PocoEficaz");
  } else if (efficacy === 0) {
    feedbackManager.showFeedback("SinEfecto");
  }


  // Feedback de golpe crítico
  if (crit > 1) {
    feedbackManager.showFeedback("Critico");

  if (defPokemon.enemy) {
    Data.UIEnemy.DrawHpBar(oldHp);
  } else {
    Data.UIAllay.DrawHpBar(oldHp);
  }

  const oldHp = defPokemon.hp;
  defPokemon.hp = Math.max(0, defPokemon.hp - damage);

  // Actualizar barras de vida
  if (defPokemon.enemy) {
    Data.UIEnemy.DrawHpBar(oldHp);
  } else {
    Data.UIAllay.DrawHpBar(oldHp);
  }

  // Actualizar movimientos del atacante
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