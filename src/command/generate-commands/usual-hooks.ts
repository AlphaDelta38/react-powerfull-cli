import { Command } from "commander";
import { hooksConstant } from "@/constants/constants.js";
import generateUsualHooks from "@/command/actions/g-hooks-action.js";

const variant = `variants:  ${hooksConstant.join(" / ")}`

function createUsualHooks(){
    return new Command('hooks')
        .alias("hks")
        .description('generate often used hooks')
        .option('-t, --disable-typescript', "Switch to javascript extension within creating current template",  false)
        .option("-p, --pick <hooks...>", `Pick multiple hooks  ${variant}`, undefined)
        .option("-e, --exclude <hooks...>", `Exclude multiple hooks ${variant}`, undefined)
        .action((options)=>generateUsualHooks(options));
}

export default createUsualHooks;
