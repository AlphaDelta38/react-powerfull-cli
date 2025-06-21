import { program } from "@/index.js";
import componentCommand from './generate-commands/components-structure.js'


function initGenerateTemplateCommands(){
    return program
        .command('generate')
        .alias('g')
        .description('Parent for generate-related commands')
        .addCommand(
            componentCommand()
        )
}


export default  initGenerateTemplateCommands;
