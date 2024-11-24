import { DrawMoveSet } from "../DrawSprites/MoveSetSprites.js";
import { Data, Random, RandomBooleano, RandomRange } from "../utils/Data.js";
import { calculateAttackEfficacy } from "./TypeChart.js";
import { showCrit, showFeedback } from "../Moves/MoveFeedback.js";

// Define una constante para identificar ataques físicos
const physical = "Physical";

/**
 * Calcula y aplica el daño de un movimiento de un Pokémon atacante hacia un Pokémon defensor.
 * 
 * @param {Object} move - Objeto que representa el movimiento utilizado.
 * @param {Object} atkPokemon - Pokémon atacante.
 * @param {Object} defPokemon - Pokémon defensor.
 * @returns {number} - La cantidad de HP del defensor antes de aplicar el daño.
 */
export function doDamage(move, atkPokemon, defPokemon) {
  // Extrae información relevante del atacante y del movimiento.
  const Level = atkPokemon.lvl;
  const Power = move.power;

  // Determina las estadísticas de ataque y defensa que se usarán según la categoría del movimiento.
  const A = move.category === physical ? atkPokemon.attack : atkPokemon.spAtk;
  const D = move.category === physical ? atkPokemon.defense : defPokemon.spDef;

  // Calcula la efectividad del ataque contra el tipo del Pokémon defensor.
  const efficacy = calculateAttackEfficacy(move.type, defPokemon);

  // Determina si ocurre un golpe crítico (6.25% de probabilidad).
  const crit = Random() < 0.0625 ? 2 : 1;

  // Calcula el bono STAB (Same Type Attack Bonus) si el tipo del ataque coincide con el tipo del atacante.
  const STAB =
    atkPokemon.type1 === move.type || atkPokemon.type2 === move.type ? 1.5 : 1;

  // Genera un factor aleatorio entre 0.85 y 1.00 para el cálculo del daño.
  const random = RandomRange(85, 100) / 100;

  // Fórmula principal para calcular el daño infligido.
  let damage = ((((2 * Level) / 20 + 2) * Power * (A / D)) / 50) + 2;
  damage = damage * STAB * crit * random * efficacy;

  // Muestra retroalimentación visual sobre la efectividad y si hubo un golpe crítico.
  showFeedback(efficacy, defPokemon.enemy);
  showCrit(crit, defPokemon.enemy);

  // Resta el daño al HP del defensor y asegura que no sea menor que 0.
  const oldHp = defPokemon.hp;
  defPokemon.hp = Math.max(0, defPokemon.hp - damage);
  return oldHp; // Retorna el HP previo del defensor.
}

let first; // Movimiento que se ejecutará primero en el turno.
let second; // Movimiento que se ejecutará en segundo lugar.

/**
 * Determina la prioridad de los movimientos actuales de ambos Pokémon.
 * 
 * @returns {boolean} - `true` si ambos movimientos tienen la misma prioridad, `false` en caso contrario.
 */
function PrioMove() {
  // Calcula la diferencia de prioridades entre el movimiento aliado y enemigo.
  var prio = Data.ActualAllayMove.prio - Data.ActualEnemyMove.prio;

  // Por defecto, asigna el orden de los movimientos basado en prioridad.
  first = Data.ActualAllayMove;
  second = Data.ActualEnemyMove;

  // Si el movimiento enemigo tiene mayor prioridad, intercambia el orden.
  if (prio < 0) {
    first = Data.ActualEnemyMove;
    second = Data.ActualAllayMove;
  }

  // Devuelve si ambos movimientos tienen la misma prioridad.
  return prio == 0;
}

/**
 * Determina el orden de los movimientos en un turno y si el movimiento inicial es del enemigo.
 * 
 * @returns {Object} - Objeto con información sobre el primer y segundo movimiento, y si el primero es enemigo.
 */
export function SetBattleTurn() {
  // Determina si ambos movimientos tienen la misma prioridad.
  let prio = PrioMove();
  var pokemonSpeeds = 0;

  // Si las prioridades son iguales, decide el orden basado en las velocidades de los Pokémon.
  if (prio) {
    pokemonSpeeds = Data.ActualAllayPokemon.speed - Data.ActualEnemyPokemon.speed;
    // Si las velocidades son iguales, decide al azar quién actúa primero.
    pokemonSpeeds == 0 ? RandomBooleano() : pokemonSpeeds;
  }

  // Si el Pokémon enemigo es más rápido, intercambia el orden de los movimientos.
  if (pokemonSpeeds < 0) {
    first = Data.ActualEnemyMove;
    second = Data.ActualAllayMove;

    // Si el Pokémon aliado es más rápido, mantiene el orden actual.
  } else if (pokemonSpeeds > 0) {
    first = Data.ActualAllayMove;
    second = Data.ActualEnemyMove;
  }

  // Verifica la precisión de ambos movimientos antes de asignarlos como ejecutables.
  first = first.acc / 100 >= Random() ? first : null;
  second = second.acc / 100 >= Random() ? second : null;

  // Devuelve el resultado del turno.
  return {
    First: first, // Movimiento que se ejecutará primero.
    Second: second, // Movimiento que se ejecutará en segundo lugar.
    IsEnemy: first == Data.ActualEnemyMove // Indica si el primer movimiento pertenece al enemigo.
  };
}