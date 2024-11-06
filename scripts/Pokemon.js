import { Move } from "./Move.js";

export class Pokemon {
  nullMove = new Move(
    "Error",
    "Error",
    "Error",
    "Error",
    "Error",
    "Error",
    "Error"
  );

  //Crítico 6,5
  constructor(
    id,
    name,
    type1,
    type2,
    total,
    hp,
    attack,
    defense,
    spAtk,
    spDef,
    speed,
    generation,
    legendary
  ) {
    this.id = id;
    this.name = name.split(" ")[0];
    this.type1 = type1;
    this.type2 = type2 || null; // Type 2 is optional
    this.total = total;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
    this.generation = generation;
    this.legendary = legendary;
    this.mega = isMega(name);
    this.enemy = false;
    this.shiny = Math.random() < 0.002;
    this.moveSet = [this.nullMove, this.nullMove, this.nullMove, this.nullMove];
  }

  // Método para mostrar los detalles básicos del Pokémon
  getDetails() {
    return `${this.name} - Types: ${this.type1}${
      this.type2 ? "/" + this.type2 : ""
    } - Legendary: ${this.legendary ? "Yes" : "No"}`;
  }

  // Método para mostrar estadísticas completas
  getStats() {
    return {
      ID: this.id,
      Name: this.name,
      Type1: this.type1,
      Type2: this.type2,
      Total: this.total,
      HP: this.hp,
      Attack: this.attack,
      Defense: this.defense,
      SpAtk: this.spAtk,
      SpDef: this.spDef,
      Speed: this.speed,
      Generation: this.generation,
      Legendary: this.legendary,
      Shiny: this.shiny,
      Mega: this.mega,
      //MoveSet: this.moveSet.map((x) => x.getStats()),
    };
  }
}

function isMega(name) {
  const regex = /(?<!^)Mega(?!$)/i; // Busca "Mega" no al principio o al final
  return regex.test(name);
}
