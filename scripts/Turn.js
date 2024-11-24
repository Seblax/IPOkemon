import { showMiss } from "./Moves/MoveFeedback.js";
import { doDamage, SetBattleTurn } from "./Pokemons/Damage.js";
import { Data } from "./utils/Data.js";

/**
 * Gestiona una ronda completa de combate, incluyendo el cálculo de turnos, ataques
 * y animaciones asociadas.
 */
export function Round() {
    // Determina el orden de los movimientos (primer y segundo ataque) y el atacante inicial.
    const turn = SetBattleTurn();
    const firstMove = turn.First; // Primer movimiento
    const secondMove = turn.Second; // Segundo movimiento

    // Define los Pokémon y animaciones correspondientes para ambos lados (aliado y enemigo).
    const Enemy = { Pokemon: Data.ActualEnemyPokemon, Animation: Data.PokemonEnemyAnimation };
    const Allay = { Pokemon: Data.ActualAllayPokemon, Animation: Data.PokemonAllayAnimation };

    // Asigna qué Pokémon actúa primero según el turno calculado.
    const firstPokemon = turn.IsEnemy ? Enemy : Allay;
    const secondPokemon = turn.IsEnemy ? Allay : Enemy;

    // Establece que no es el turno del jugador inicialmente.
    Data.YouTurn = false;

    let roundFrames = 0; // Contador de cuadros específico para esta ronda.

    // Callback que se ejecuta cada frame de la animación de la ronda.
    const roundCallback = (deltaTime) => {
        // A los 150 frames, verifica si el segundo Pokémon está fuera de combate.
        if (roundFrames == 150) {
            if (secondPokemon.Pokemon.hp <= 0) {
                Data.YouTurn = true; // Finaliza el turno si el segundo Pokémon es derrotado.
                Data.AnimationManager.remove(roundCallback);
                return;
            }

            // Realiza el ataque del segundo movimiento.
            Attack(secondMove, secondPokemon, firstPokemon);
        }
        // A los 300 frames, finaliza la ronda.
        else if (roundFrames >= 300) {
            Data.YouTurn = ~Data.YouTurn; // Cambia el turno al jugador o enemigo.
            Data.AnimationManager.remove(roundCallback); // Detiene el callback de la ronda.
        }

        roundFrames++; // Incrementa el contador de cuadros para esta ronda.
    };

    // Realiza el primer ataque de la ronda.
    Attack(firstMove, firstPokemon, secondPokemon);

    // Agrega el callback de la ronda al manejador de animaciones para continuar con el segundo ataque.
    Data.AnimationManager.add(roundCallback);
}

/**
 * Gestiona un ataque específico entre dos Pokémon, incluyendo animaciones y efectos.
 * 
 * @param {Object} move - Movimiento que se ejecutará (puede ser `null` si falla).
 * @param {Object} pokemonAtk - Pokémon atacante.
 * @param {Object} pokemonDef - Pokémon defensor.
 */
function Attack(move, pokemonAtk, pokemonDef) {
    let attackFrames = 0; // Contador de cuadros para esta instancia de ataque.

    // Inicia la animación del ataque.
    pokemonAtk.Animation.AttackAnimation(move);

    // Callback que maneja los eventos durante la animación del ataque.
    const roundAttackCallback = (deltaTime) => {
        // Finaliza el ataque a los 150 frames.
        if (attackFrames === 150) {
            Data.AnimationManager.remove(roundAttackCallback);
            return;
        }

        attackFrames++; // Incrementa el contador de cuadros del ataque.

        // A los 10 frames, inicia la animación de recibir daño en el defensor.
        if (attackFrames == 10) {
            pokemonDef.Animation.DamageAnimation();
        }
        // A los 80 frames, aplica el daño y gestiona los efectos secundarios.
        else if (attackFrames == 80) {
            // Si el movimiento no existe (falla), muestra una animación de fallo y detiene el ataque.
            if (move == null) {
                showMiss(pokemonDef.Pokemon.enemy);
                return;
            }

            // Calcula y aplica el daño al Pokémon defensor.
            const oldHP = doDamage(move, pokemonAtk.Pokemon, pokemonDef.Pokemon);

            // Actualiza la barra de vida del defensor según su rol (enemigo o aliado).
            if (pokemonDef.Pokemon.enemy) {
                Data.UIEnemy.DrawHpBar(oldHP);
            } else {
                Data.UIAllay.DrawHpBar(oldHP);
            }

            // Si el Pokémon defensor es derrotado, finaliza el ataque y el turno.
            if (pokemonDef.Pokemon.hp <= 0) {
                Data.YouTurn = true; // Marca el turno como finalizado.
                Data.AnimationManager.remove(roundAttackCallback);
                return;
            }
        }
    };

    // Agrega el callback del ataque al manejador de animaciones.
    Data.AnimationManager.add(roundAttackCallback);
}
