import { GeneralConfigManager } from "../../../utils/config-utils.js";



interface newStructure {
    [key: string]: null | newStructure;
}

const newStructure: newStructure = {}

function insertNestedPath(keys: string[], value = null) {
    let current = newStructure;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {

            if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
                current[key] = {};
            }

            current = current[key]!;
        }
    });
}


function setToNewStructure(path: string): void {
    const chain = path.split("/")
    insertNestedPath(chain)
}

function structureToConfig(){
    GeneralConfigManager.write({structure: newStructure})
}

export {
    setToNewStructure,
    structureToConfig
}
