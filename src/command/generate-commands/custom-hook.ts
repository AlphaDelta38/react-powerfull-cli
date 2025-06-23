import { Command } from "commander";
import generateHook from "@/command/actions/g-hook-action.js";

function createCustomHook(){
    return new Command('hook')
        .alias("hk")
        .argument('<name>', 'Hook name')
        .description('generate Hook by name with from file-templates')
        .option('-t, --disable-typescript', "Switch to javascript extension within creating current template",  false)
        .option('--di', "Just write flag that dont include interface", false)
        .action((name, options)=>generateHook(name, options));
}

export default createCustomHook;
