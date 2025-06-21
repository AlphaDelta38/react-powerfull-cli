import generate from "@/templates/generate.js";

import { GeneralConfigManager } from "@/utils/config-utils.js";
import { components } from "@/constants/template-paths.js";

import type {generateComponents, generateProps} from "@/types/generate-props.js";


interface IOptions{
    disableTypescript: boolean;
    css: string;
    ds: boolean;
    di: boolean;
    cpt: "fn" | "fc" | "fr";
}

async function generateComponentsStructure(name: string, options: IOptions) {
    const componentDirPath: string = GeneralConfigManager.extractPaths(["components"])[0];
    const useTypescript: boolean = options["disableTypescript"] ? false : GeneralConfigManager.read()?.useTypescript ?? true;
    const cssType = options.css ?? GeneralConfigManager.read()["css-type"]

    const generateData: generateComponents = {
        componentType: options.cpt,
        useCSS: !options.ds,
        useInterface: !options.di,
        useTypescript,
        cssType,
    }

    const generateProps: generateProps = {
        name,
        extension: "",
        templatePath:"",
        generatedPath: componentDirPath,
        data: generateData
    }


    /// generate tsx ///

    await createTsx(generateProps)

    /// generate css ///
    await createCSS(generateProps)

    /// generate index.ts ///
    await createIndex(generateProps)

}

function createTsx(generateProps: generateProps){
    const extension = generateProps.data.useTypescript ? "tsx" : "jsx"

    return generate({...generateProps, extension: extension, templatePath: components["main"].path})
}

function createCSS(generateProps: generateProps){
    if(!generateProps.data.useCSS) return;

    return generate({...generateProps, extension: `module.${generateProps.data.cssType}`, templatePath: components["css"].path} )
}

function createIndex(generateProps: generateProps){
    const extension = generateProps.data.useTypescript ? "ts" : "js"

    return generate({...generateProps, extension: extension, templatePath: components["index"].path, fileName:"index"} )
}

export default generateComponentsStructure;
