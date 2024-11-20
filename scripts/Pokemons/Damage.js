import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";
import { FeedbackManager } from "../utils/FeedbackManager.js"
const physical = "Physical";
const feedbackManager = new FeedbackManager();

export function doDamage(move, atkPokemon, defPokemon) {
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
