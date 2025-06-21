import type { IObj } from "@/types/types.js";

function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function filterObjectByKey(obj: IObj, allowKeys: string[] ): IObj {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowKeys.includes(key))
    );
}

export {
    isObject,
    filterObjectByKey
}

