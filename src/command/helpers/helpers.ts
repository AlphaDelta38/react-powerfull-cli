import { GeneralConfigManager } from "@/utils/config-utils.js";

/// Overload ///
function getDirByName(names: string[], index: number): string;
function getDirByName(names: string[], index?: undefined): string[];
/// Overload ///


function getDirByName(names: string[], index?: number): string[] | string {
    const componentDirPath: string[] = GeneralConfigManager.extractPaths(names);
    return index !== undefined ? componentDirPath[index] : componentDirPath;
}

function getUserTypescript(options: any, param?: string): boolean {
    return options[param ?? "disableTypescript"] ? false : GeneralConfigManager.read()?.useTypescript ?? true;
}

export {
    getDirByName,
    getUserTypescript
}
