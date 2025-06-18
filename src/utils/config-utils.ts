import fs from 'fs-extra';
import path from 'node:path';
import { isObject } from './utils.js';
import type { ConfigTypes, IPathResult } from '../types/config.types.js';
import type { Counter } from '../types/types.js';

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

    extractPaths(keys: string[]): IPathResult {
        const config = this.read();
        const generationPaths = config.generationPaths;
        const structure = generationPaths ?? config.structure;

        const result: IPathResult = {};
        const counter: Counter = {};
        const stack = [...Object.entries(structure)];
        let path = '';

        if (generationPaths) {
            for (const [key, value] of Object.entries(generationPaths)) {
                result[key] = value;
            }
        }

        while (stack.length) {
            const [key, value] = stack.pop()!;

            if (path !== '') {
                const lastKey = path.split('/').pop();
                if (lastKey !== undefined && counter[lastKey] === 0) {
                    const regex = new RegExp(`/?${lastKey}`, 'i');
                    path = path.replace(regex, '');
                } else if (lastKey !== undefined) {
                    counter[lastKey] = counter[lastKey] - 1;
                }
            }

            if (typeof value === 'string' && keys.includes(key)) {
                result[key] = value;
                path = '';
                continue;
            }

            if (isObject(value)) {
                const items = Object.entries(value);
                for (const item of items) {
                    stack.push(item);
                }

                path += path === '' ? key : '/' + key;
                counter[key] = items.length;
                continue;
            }

            if (keys.includes(key) && !result[key]) {
                result[key] = path;
            }
        }

        return result;
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
