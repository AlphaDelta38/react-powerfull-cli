import path from "node:path";
import * as fs from "node:fs";
import type {ConfigTypes, IPathResult} from "../types/config.types.js";
import { isObject } from "./utils.js";
import type { Counter } from "../types/types.js";

const configPath: string = path.resolve(process.cwd(), 'rpc.config.json');


function createConfig() {
    if(!fs.existsSync(configPath)){
        fs.writeFileSync(configPath, '{}', 'utf-8');
    }
}


function writeToConfig(obj: Partial<ConfigTypes>){
    if(!configPath) return;

    const currentConfig = readFromConfig()
    const entries = Object.entries(obj)

    if(Object.entries(obj).length > 0){
        for (const [key, value] of entries) {
            // @ts-ignore
            currentConfig[key] = value;
        }
    }

    fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 4));
}


function readFromConfig(): ConfigTypes {
    if (!configPath) {
        throw new Error(`Config file not found at ${configPath}`);
    }
    const raw = fs.readFileSync(configPath, 'utf-8');

    return JSON.parse(raw) as ConfigTypes;
}


function fromConfigToPath(keys: string[]) {
    const generationPaths = readFromConfig()?.generationPaths
    const structure =  generationPaths ?? readFromConfig().structure

    const stack = [...Object.entries(structure)]
    const result: IPathResult  = {}
    const counter: Counter = {}

    if(generationPaths){
        const items = Object.entries(generationPaths)
        for (const [key, value] of items) {
            result[key] = value
        }
    }


    let path = ""

    while (stack.length) {
        const [key, value] = stack.pop()!;

        if(path !== ""){
            const lastKey = path.split("/").pop();

            if(lastKey !== undefined && counter[lastKey] === 0){
                const regex = new RegExp(`\/?${lastKey}`, 'i');
                path = path.replace(regex, "");
            }else if(lastKey !== undefined){
                counter[lastKey] = counter[lastKey] - 1;
            }
        }

        if(typeof value === "string" && keys.includes(key)){
            result[key] = value
            path = ""
            continue;
        }

        if(isObject(value)){
            const items = Object.entries(value)
            for (const item of items) {
                stack.push(item)
            }

            path += path === "" ? key : "/" + key

            counter[key] = items.length
            continue;
        }


        if(keys.includes(key) && !result[key]){
            result[key] = path
        }

    }

    return result;
}



export {
    createConfig,
    writeToConfig,
    readFromConfig,
    fromConfigToPath
}
