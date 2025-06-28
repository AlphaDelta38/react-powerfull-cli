import { defaultCommander } from "@/default-commander.js";
import generateComponentsStructure from "@/command/actions/g-components-action.js";

function createComponentsStructure(){
    return defaultCommander('component', ["disableInterface", "useTypescript", "disableCss"])
        .alias("ct")
        .argument('<name>', 'Component name')
        .description('create component folder structure with file-templates')
        .option('-s, --css <cssType>', "Enter css or preprocessor type")
        .option('--cpt <type>', "Enter the type of component function fn / fc / fr  ", "fn")
        .action((name, options)=>generateComponentsStructure(name, options));
}

export default createComponentsStructure;
