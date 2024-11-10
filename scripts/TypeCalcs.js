import { Data } from "./utils/Data.js";

export async function calcTypes(type1, type2) {
    let allTypes = await Data.Types;

    let res = 1;

    if (!(type1 in allTypes && type2 in allTypes)) {
        console.error("Alguno de los tipos no existe: " + type1 + " o " + type2 + " está mal.");
        res = -1;
        return res;
    }

    try {
        let type1Values = allTypes[type1];

        type2 = type2.toLowerCase()

        if (type1Values[0].includes(type2)) {
            res = 2.0;
        } else if (type1Values[1].includes(type2)) {
            res = 0.5;
        } else if (type1Values[2].includes(type2)) {
            res = 0;
        }

    return res;

    } catch (err) {
        console.log("Algo ha salido mal: " + err);
    }
}

