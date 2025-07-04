import { defaultCommander } from "@/default-commander.js";
import generateComponentsStructure from "@/command/actions/g-components-action.js";

function createComponentsStructure(){
    return defaultCommander('component', ["disableInterface", "useTypescript", "disableCss", "folder", "unpack"])
        .alias("ct")
        .argument('<name>', 'Component name')
        .description('create component folder structure with file-templates')
        .option('-s, --css <cssType>', "Enter css or preprocessor type")
        .option('--cpt <type>', "Enter the type of component function fn / fc / fr  ", "fn")
        .option('-x, --withIndex', "Use this flag for disable generation index file", false)
        .action((name, options)=>generateComponentsStructure(name, options));
}

export default createComponentsStructure;
