import { Command } from "commander";
import generateComponentsStructure from "@/command/actions/g-components-action.js";

function createComponentsStructure(){
    return new Command('component <name>')
        .alias("ct")
        .argument('<name>', 'Component name')
        .description('create component folder structure with file-templates')
        .option('-t, --disable-typescript', "Switch to javascript extension within creating current template",  false)
        .option('-s, --css <cssType>', "Enter css or preprocessor type")
        .option('--cpt <type>', "Enter the type of component function fn / fc / fr  ", "fn")
        .option('--ds', "Just write flag that dont include css", false)
        .option('--di', "Just write flag that dont include interface", false)
        .action((name, options)=>generateComponentsStructure(name, options));
}

export default createComponentsStructure;
