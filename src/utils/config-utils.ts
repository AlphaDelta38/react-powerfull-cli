import fs from 'fs-extra';
import path from 'node:path';
import { isObject } from './utils.js';
import * as process from "node:process";

import type { ConfigTypes, IPathResult } from '@/types/config.types.js';
import type { Counter } from '@/types/types.js';

export class ConfigManager {
    private readonly configPath: string;

    constructor(configFileName = 'rpc.config.json') {
        this.configPath = path.resolve(process.cwd(), configFileName);
    }

    createConfig() {
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, '{}', 'utf-8');
        }
    }

    read(): ConfigTypes {
        if (!this.configPath) {
            throw new Error(`Config file not found at ${this.configPath}`);
        }
        return fs.readJsonSync(this.configPath);
    }

    write(obj: Partial<ConfigTypes>) {
        const currentConfig = this.read();
        for (const [key, value] of Object.entries(obj)) {
            currentConfig[key] = value;
        }

        fs.writeJsonSync(this.configPath, currentConfig, { spaces: 4 });
    }

    extractPaths(keys: string[]): string[] {
        const config = this.read();
        const generationPaths = config.generationPaths;
        const structure = generationPaths ?? config?.structure;

        if(!structure && !generationPaths){
            return [process.cwd()];
        }

        const result: IPathResult = {};
        const counter: Counter = {};
        const stack = [...Object.entries(structure)];
        let tempPath = '';

        if (generationPaths) {
            for (const [key, value] of Object.entries(generationPaths)) {
                result[key] = value;
            }
        }

        while (stack.length) {
            const [key, value] = stack.pop()!;

            if (tempPath !== '') {
                const lastKey = tempPath.split('/').pop();
                if (lastKey !== undefined && counter[lastKey] === 0) {
                    const regex = new RegExp(`/?${lastKey}`, 'i');
                    tempPath = tempPath.replace(regex, '');
                } else if (lastKey !== undefined) {
                    counter[lastKey] = counter[lastKey] - 1;
                }
            }

            if (typeof value === 'string' && keys.includes(key)) {
                result[key] = value;
                tempPath = '';
                continue;
            }

            if (isObject(value)) {
                const items = Object.entries(value);
                for (const item of items) {
                    stack.push(item);
                }

                tempPath += tempPath === '' ? key : '/' + key;
                counter[key] = items.length;
                continue;
            }

            if (keys.includes(key) && !result[key]) {
                result[key] = tempPath;
            }
        }

        if(Object.entries(result).length === 0){
            return [process.cwd()];
        }

        return Object.entries(result).map(([key, value]) => path.join(value, key));
    }
}




const configManagerCache: Record<string, ConfigManager> = {};

function getInstanceConfigManager(path: string): ConfigManager {
    if (!configManagerCache[path]) {
        configManagerCache[path] = new ConfigManager(path);
    }
    return configManagerCache[path];
}

const GeneralConfigManager = new ConfigManager();

export {
    getInstanceConfigManager,
    GeneralConfigManager
}
