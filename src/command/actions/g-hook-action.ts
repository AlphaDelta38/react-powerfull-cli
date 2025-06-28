import { filterObjectByKey, getDirByName } from "@/utils/utils.js";
import { toCamelCase } from "@/utils/text-utils.js";
import { hooks } from "@/constants/template-paths.js";
import generate from "@/templates/generate.js";

import type { customHookTemplateProps } from "@/templates/types/hooks.js";
import type { IBasicOptions } from "@/types/types.js";

import createUseTypeScriptController from "@/command/priority-value-controllers/useTypeScript-controller.js";


interface IOptions extends Pick<IBasicOptions, "useTypescript" | "di" | "folder">{
}

async function generateHook(name:string, options: IOptions){
    const componentDirPath: string = options["folder"] ?? getDirByName(["hooks"], 0);

    const typeScriptController = createUseTypeScriptController()
    typeScriptController.placeAt(options["useTypescript"], 1)

    const useTypescript: boolean = typeScriptController.get()

    const { data } : Pick<customHookTemplateProps, "data"> = {
        data: {
            useTypescript: useTypescript,
            useInterface: !options.di
        }
    };

    const generateProps: customHookTemplateProps = {
        name,
        extension: "",
        templatePath:"",
        generatedPath: componentDirPath,
        data
    }

    await createHook({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useTypescript", "useInterface"
        ])
    })

}

async function createHook(generateProps: customHookTemplateProps){
    const extension = generateProps.data.useTypescript ? "ts" : "js"
    const camelCase = toCamelCase(generateProps.name, "-")

    return generate({...generateProps, extension, name: camelCase, templatePath: hooks["custom"].path, fileName: `use${camelCase}` })
}

export default generateHook;
