
function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function filterObjectByKey<T extends object>(obj: T, allowKeys: (keyof T)[] ): Pick<T, typeof allowKeys[number]> {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowKeys.includes(key as keyof T))
    ) as Pick<T, typeof allowKeys[number]>;
}

export {
    isObject,
    filterObjectByKey
}

