import { defaultCommander } from "@/default-commander.js";
import generateHook from "@/command/actions/g-hook-action.js";

function createCustomHook(){
    return defaultCommander('hook', ["disableInterface", "useTypescript", "folder"])
        .alias("hk")
        .argument('<name>', 'Hook name')
        .description('generate Hook by name with from file-templates')
        .action((name, options)=>generateHook(name, options));
}

export default createCustomHook;
