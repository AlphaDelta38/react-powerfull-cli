import generate from "@/templates/generate.js";

import { filterObjectByKey } from "@/utils/utils.js";
import { GeneralConfigManager } from "@/utils/config-utils.js";
import { capitalizeFirstLetter } from "@/utils/text-utils.js";
import { components } from "@/constants/template-paths.js";

import type {
    cssTemplateProps,
    indexTemplateProps,
    tsxTemplateProps,
    componentsAllDataTypes, generateTypesForAction
} from "@/templates/types/components.js";

import createUseTypeScriptController from "@/command/priority-value-controllers/useTypeScript-controller.js";



interface IOptions{
    useTypescript: boolean;
    css: string;
    ds: boolean;
    di: boolean;
    cpt: "fn" | "fc" | "fr";
}

async function generateComponentsStructure(name: string, options: IOptions) {
    const componentDirPath: string = GeneralConfigManager.extractPaths(["components"])[0];

    const typeScriptController = createUseTypeScriptController()
    typeScriptController.placeAt(options["useTypescript"], 1)

    const useTypescript: boolean = typeScriptController.get()
    const cssType = options.css ?? GeneralConfigManager.read()["css-type"]

    const generateData: componentsAllDataTypes = {
        componentType: options.cpt,
        useCSS: !options.ds,
        useInterface: !options.di,
        useTypescript,
        cssType,
    }

    const generateProps: generateTypesForAction = {
        name: capitalizeFirstLetter(name),
        extension: "",
        templatePath:"",
        generatedPath: componentDirPath,
        data: generateData
    }


    /// generate tsx ///
    await createTsx({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "componentType", "useInterface", "useCSS", "cssType", "componentType", "useTypescript"
        ])
    })

    /// generate css ///
    await createCSS({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useCSS", "cssType"
        ])
    })

    /// generate index.ts ///
    await createIndex({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useTypescript",
        ])
    })

}

function createTsx(generateProps: tsxTemplateProps){
    const extension = generateProps.data.useTypescript ? "tsx" : "jsx"

    return generate({...generateProps, extension: extension, templatePath: components["tsx"].path}, true)
}

function createCSS(generateProps: cssTemplateProps){
    if(!generateProps.data.useCSS) return;

    return generate({...generateProps, extension: `module.${generateProps.data.cssType ?? "css"}`, templatePath: components["css"].path}, true)
}

function createIndex(generateProps: indexTemplateProps){
    const extension = generateProps.data.useTypescript ? "ts" : "js"

    return generate({...generateProps, extension: extension, templatePath: components["index"].path, fileName:"index"}, true)
}

export default generateComponentsStructure;
