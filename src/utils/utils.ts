import { GeneralConfigManager } from "@/utils/config-utils.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isExist(value: any){
    if(typeof value === 'string' && value.replace(/\s+/g, '')){
        return true;
    }

    if(typeof value === "boolean" && !value){
        return true;
    }

    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length > 0;
    }

    return Boolean(value);
}

function filterObjectByKey<T extends object>(obj: T, allowKeys: (keyof T)[] ): Pick<T, typeof allowKeys[number]> {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowKeys.includes(key as keyof T))
    ) as Pick<T, typeof allowKeys[number]>;
}

function getDirname(metaUrl: string) {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = dirname(__filename);
    return { __filename, __dirname };
}

/// Overload ///
function getDirByName(names: string[], index: number): string;
function getDirByName(names: string[], index?: undefined): string[];
/// Overload ///

function getDirByName(names: string[], index?: number): string[] | string {
    const componentDirPath: string[] = GeneralConfigManager.extractPaths(names);
    return index !== undefined ? componentDirPath[index] : componentDirPath;
}

export {
    isExist,
    isObject,
    getDirname,
    getDirByName,
    filterObjectByKey
}

