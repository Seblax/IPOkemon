import { Data } from "./utils/Data.js";

function calculateEfficacy(type1, type2) {
  let allTypes = Data.Types;
  let res = 1;

  if (!(type1 in allTypes && type2 in allTypes)) {
    console.error(
      "Alguno de los tipos no existe: " + type1 + " o " + type2 + " está mal."
    );
    return res;
  }

  try {
    let type1Values = allTypes[type1];
    type2 = type2.toLowerCase();

    if (type1Values[0].includes(type2)) {
      res = 2.0;
    } else if (type1Values[1].includes(type2)) {
      res = 0.5;
    } else if (type1Values[2].includes(type2)) {
      res = 0;
    }
    return res;
  } catch (err) {
    console.log("Error al calcular la eficacia delos tipos: " + err);
  }
}

export function calculateAttackEfficacy(attackType, defender) {
  var defenderFirstType = defender.type1;
  var defenderSecondType = defender.hasSecondType ? defender.type2 : null;

  var res = 1 * calculateEfficacy(attackType, defenderFirstType);

  res *=
    defenderSecondType != "None"
      ? calculateEfficacy(attackType, defenderSecondType)
      : 1;

  return res;
}
