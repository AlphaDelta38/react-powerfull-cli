import { program } from "../../index.js";
import UnitedActions from "./actions/index.js";

function initFolderStructure(){

    program
        .command('create')
        .description('Initialize React powerfull CLI')
        .action(UnitedActions);


}

export default initFolderStructure;
