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

function priorityQueue(queue: (boolean | string)[]): boolean | any{
    const config = GeneralConfigManager.read()

    for (const queueElement of queue) {
        if(typeof queueElement === 'boolean' && queueElement) return true;

        if(typeof queueElement === "string" && !queueElement.includes("/") && isExist(queueElement)) return queueElement;

        if(typeof queueElement === "string" && queueElement.includes("/")){
            const keys = queueElement.split("/");
            let result = config;

            for (const key of keys) {
                if (result == null || !(key in result)) break;
                result = result[key];
            }

            if (isExist(result)) {
                return result;
            }

        }

    }

    return false;
}

export {
    isExist,
    isObject,
    getDirname,
    priorityQueue,
    filterObjectByKey
}

