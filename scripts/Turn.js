import { showMiss } from "./Moves/MoveFeedback.js";
import { doDamage, SetBattleTurn } from "./Pokemons/Damage.js";
import { Data } from "./utils/Data.js";

export function Round() {
    const turn = SetBattleTurn();

    const firstMove = turn.First;
    const secondMove = turn.Second;

    const Enemy = { Pokemon: Data.ActualEnemyPokemon, Animation: Data.PokemonEnemyAnimation };
    const Allay = { Pokemon: Data.ActualAllayPokemon, Animation: Data.PokemonAllayAnimation };

    const firstPokemon = turn.IsEnemy ? Enemy : Allay;
    const secondPokemon = turn.IsEnemy ? Allay : Enemy;

    Data.YouTurn = false;

    let roundFrames = 0; // Local para esta ronda

    const roundCallback = (deltaTime) => {
        if (roundFrames == 150) {
            if (secondPokemon.Pokemon.hp <= 0) {
                Data.YouTurn = true;
                Data.AnimationManager.remove(roundCallback);
                return
            }

            Attack(secondMove, secondPokemon, firstPokemon);
        } else if (roundFrames >= 300) {
            Data.YouTurn = ~Data.YouTurn
            Data.AnimationManager.remove(roundCallback);
        }

        roundFrames++; // Incrementa el contador solo para este contexto
    };

    Attack(firstMove, firstPokemon, secondPokemon); // Primer ataque
    Data.AnimationManager.add(roundCallback); // Agrega el callback para el segundo ataque
}

function Attack(move, pokemonAtk, pokemonDef) {
    let attackFrames = 0; // Local para esta instancia de Attack
    pokemonAtk.Animation.AttackAnimation();

    const roundAttackCallback = (deltaTime) => {
        if (attackFrames === 150) {
            Data.AnimationManager.remove(roundAttackCallback);
            return;
        }

        attackFrames++; // Incrementa el contador solo para este contexto

        if (attackFrames == 10) {
            pokemonDef.Animation.DamageAnimation();
        } else if (attackFrames == 80) {
            if (move == null) {
                showMiss(pokemonDef.Pokemon.enemy);
                return;
            }

            const oldHP = doDamage(move, pokemonAtk.Pokemon, pokemonDef.Pokemon);

            // Actualizar barras de vida
            if (pokemonDef.Pokemon.enemy) {
                Data.UIEnemy.DrawHpBar(oldHP);
            } else {
                Data.UIAllay.DrawHpBar(oldHP);
            }

            if (pokemonDef.Pokemon.hp <= 0) {
                Data.YouTurn = true
                Data.AnimationManager.remove(roundAttackCallback);
                return
            }
        }
    };

    Data.AnimationManager.add(roundAttackCallback);
}
