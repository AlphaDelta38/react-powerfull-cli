import path from "node:path";
import * as fs from "node:fs";
import { GeneralConfigManager } from "./config-utils.js";


function createFolder(inputPath: string): string {
    const root = GeneralConfigManager.read().rootDir ?? "."
    const resolvePath = path.resolve(process.cwd(), root, inputPath);

    if (!fs.existsSync(resolvePath)) {
        fs.mkdirSync(resolvePath, { recursive: true });
    }

    return resolvePath
}

export {
    createFolder
}
