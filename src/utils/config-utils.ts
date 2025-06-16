import path from "node:path";
import * as fs from "node:fs";
import type { ConfigTypes } from "../types/config.types.js";

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

export {
    createConfig,
    writeToConfig,
    readFromConfig
}