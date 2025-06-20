import { program } from "@/index";
import generateComponentsStructure from "@/command/actions/g-components-action";


function initGenerateComponents(){
    return program
        .command('generate component <name>')
        .alias('g comp')
        .description('create component folder structure with templates')
        .option('-t, --type', "choose between js / ts", "ts")
        .option('-s, --css', "Enter css or preprocessor type", "css")
        .option('-cpt, --cp-type', "Enter the type of component function fn / fc / fr  ", "fn")
        .option('-ds, --disable-css', "Just write flag that dont include css", false)
        .option('-di, --disable-interface', "Just write flag that dont include interface", false)
        .action((name, options)=>generateComponentsStructure(name, options));
}


export default  initGenerateComponents;
