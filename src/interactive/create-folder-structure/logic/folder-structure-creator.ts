import { GeneralConfigManager } from "../../../utils/config-utils.js";
import type { IProjectSizeType } from "../../../types/config.types.js";
import { createFolder } from "../../../utils/file-utils.js";
import { isObject } from "../../../utils/utils.js";
import { setToNewStructure, structureToConfig } from "./structure-to-config.js";

import type { Counter } from '../../../types/types.js'


const project: IProjectSizeType = {
    small: {
        components: null,
        pages: null,
    },

    middle: {
        components: null,
        pages: null,
        assets: null,
        features: null,
        routes: null,
        services: null,
        store: null,
        utils: null,
        hooks: null,
    },

    large: {
        app: {
            store: null,
            router: null,
            i18n: null,
            theme: null
        },
        shared: {
            components: null,
            utils: null,
            hooks: null,
            types: null
        },
        entities: null,
        features: null,
        widgets: null,
        pages: null,
    }

};

function FolderStructureCreator(size: 'large' | 'middle' | 'small', reWrite: boolean) {
    const structure = GeneralConfigManager.read()?.structure ?? project[size]
    const stack = [...Object.entries(structure)]

    reWrite = GeneralConfigManager.read()?.structure === undefined ? true : reWrite


    const counter: Counter = {}
    let path = ""
    let item = null;


    while ((item = stack.pop())) {
        const [key, value] = item;

        if(path !== ""){
            const lastKey = path.split("/").pop();

            if(lastKey !== undefined && counter[lastKey] === 0){
                const regex = new RegExp(`\/?${lastKey}`, 'i');
                path = path.replace(regex, "");
            }else if(lastKey !== undefined){
                counter[lastKey] = counter[lastKey] - 1;
            }
        }

        if(typeof value === "string"){
            const currentPath = value  + "/" + key;

            createFolder(currentPath)
            setToNewStructure(currentPath)

            continue;
        }

        if(isObject(value)){
            const elements = Object.entries(value)
            for (const element of elements) {
                stack.push(element)
            }

            path += path !== "" ? "/" + key : key

            createFolder(path)
            setToNewStructure(path)

            counter[key] = elements.length
            continue;
        }

        const currentPath = path !== "" ? path + "/" + key : key;

        createFolder(currentPath)
        setToNewStructure(currentPath)

    }

    if(reWrite){
        structureToConfig()
    }

}


export default FolderStructureCreator;
