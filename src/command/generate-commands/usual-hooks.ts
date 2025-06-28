import { hooksConstant } from "@/constants/constants.js";
import { defaultCommander } from "@/default-commander.js";
import generateUsualHooks from "@/command/actions/g-hooks-action.js";

const variant = `variants:  ${hooksConstant.join(" / ")}`

function createUsualHooks(){
    return defaultCommander("hooks", ["disableTypescript"])
        .alias("hks")
        .description('generate often used hooks')
        .option("-p, --pick <hooks...>", `Pick multiple hooks  ${variant}`, undefined)
        .option("-e, --exclude <hooks...>", `Exclude multiple hooks ${variant}`, undefined)
        .action((options)=>generateUsualHooks(options));
}

export default createUsualHooks;
