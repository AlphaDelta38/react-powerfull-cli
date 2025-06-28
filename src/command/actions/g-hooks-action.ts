import path from "node:path";
import { filterObjectByKey, getDirname, getDirByName } from "@/utils/utils.js";
import { hooksConstant, hookConstantAlias } from "@/constants/constants.js";
import { hooks } from "@/constants/template-paths.js";
import generate from "@/templates/generate.js";

import type { usualHooksTemplateProps } from "@/templates/types/hooks.js";

import createUseTypeScriptController from "@/command/priority-value-controllers/useTypeScript-controller.js";


const { __dirname } = getDirname(import.meta.url);


interface IOptions{
    useTypescript: boolean;
    pick: string[] | undefined
    exclude: string[] | undefined
}

async function generateUsualHooks(options: IOptions){
    const componentDirPath: string = getDirByName(["hooks"], 0)

    const typeScriptController = createUseTypeScriptController()
    typeScriptController.placeAt(options["useTypescript"], 1)

    const useTypescript: boolean = typeScriptController.get()

    const { data }: Pick<usualHooksTemplateProps, "data"> = {
        data:{
            useTypescript: useTypescript,
            useDeb: true,
            useClickOut: true,
            usePrev: true,
            useToggle: true
        }
    }


    if(options.pick || options.exclude){
        const temp = hooksConstant
            .filter(hook => options.pick
                ? options.pick?.includes(hook)
                : !options.exclude?.includes(hook)
            )
            .map(key => hookConstantAlias[key])

        for (const key of Object.keys(data)) {
            if(key !== "useTypescript" && !temp.includes(key)){
                data[key as keyof typeof data] = false;
            }
        }
    }



    const generateProps: usualHooksTemplateProps = {
        name: "hooks",
        extension: "",
        templatePath:"",
        generatedPath: componentDirPath,
        data,
    }

    await createHook({
        ...generateProps,
        data: filterObjectByKey(generateProps.data, [
            "useTypescript", "useDeb", "useClickOut", "usePrev", "useToggle"
        ])
    })

}

async function createHook(generateProps: usualHooksTemplateProps){
    const extension = generateProps.data.useTypescript ? "ts" : "js"
    const includePath = path.resolve(__dirname, '../../templates/file-templates/hooks/usual');

    return generate({...generateProps, extension, templatePath: hooks["usual"].path, includePath })
}

export default generateUsualHooks;
