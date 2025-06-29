import generate from "@/templates/generate.js";

import { filterObjectByKey, getDirByName } from "@/utils/utils.js";
import { GeneralConfigManager } from "@/utils/config-utils.js";
import { capitalizeFirstLetter } from "@/utils/text-utils.js";
import { components } from "@/constants/template-paths.js";

import type {
    cssTemplateProps,
    indexTemplateProps,
    tsxTemplateProps,
    componentsAllDataTypes, generateTypesForAction
} from "@/templates/types/components.js";
import type { IBasicOptions } from "@/types/types.js";

import createUseTypeScriptController from "@/command/priority-value-controllers/useTypeScript-controller.js";


interface IOptions extends Pick<IBasicOptions, "folder" | "ds" | "useTypescript" | "di" | "unpack">{
    css: string;
    withIndex: boolean;
    cpt: "fn" | "fc" | "fr";
}

async function generateComponentsStructure(name: string, options: IOptions) {
    const componentDirPath: string = options["folder"] ?? getDirByName(["components"], 0);

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
        ]),
    }, options["unpack"])

    /// generate css ///
    await createCSS({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useCSS", "cssType"
        ])
    }, options["unpack"])

    /// generate index.ts ///
    await createIndex({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useTypescript",
        ])
    }, options["unpack"], options["withIndex"])

}

function createTsx(generateProps: tsxTemplateProps, unpack: boolean){
    const extension = generateProps.data.useTypescript ? "tsx" : "jsx"

    return generate({...generateProps, extension: extension, templatePath: components["tsx"].path}, !unpack)
}

function createCSS(generateProps: cssTemplateProps, unpack: boolean){
    if(!generateProps.data.useCSS) return;

    return generate({...generateProps, extension: `module.${generateProps.data.cssType ?? "css"}`, templatePath: components["css"].path}, !unpack)
}

function createIndex(generateProps: indexTemplateProps, unpack: boolean, offCreate: boolean){
    if(offCreate) return;

    const extension = generateProps.data.useTypescript ? "ts" : "js"

    return generate({...generateProps, extension: extension, templatePath: components["index"].path, fileName:"index"}, !unpack)
}

export default generateComponentsStructure;
