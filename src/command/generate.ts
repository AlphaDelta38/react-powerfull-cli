import { program } from "@/index.js";
import componentCommand from './generate-commands/components-structure.js'
import createCustomHook from "@/command/generate-commands/custom-hook.js";
import createUsualHooks from "@/command/generate-commands/usual-hooks.js";


function initGenerateTemplateCommands(){
    return program
        .command('generate')
        .alias('g')
        .description('Parent for generate-related commands')
        .addCommand(componentCommand())
        .addCommand(createCustomHook())
        .addCommand(createUsualHooks())
}


export default  initGenerateTemplateCommands;
