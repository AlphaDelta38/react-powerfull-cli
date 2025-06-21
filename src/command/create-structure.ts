import { program } from "@/index.js";
import folderStructureCreator from "../interactive/create-folder-structure/logic/folder-structure-creator.js";

function initStructureCommand(){
    return program
        .command('create-structure')
        .alias('create-st')
        .description('create project folder structure (if config already exists)')
        .option('-r, --rewrite', "Overwrite folder structure, from your to basic for project", false)
        .action((options)=>folderStructureCreator("large", options["rewrite"]));
}

export {
    initStructureCommand
}
