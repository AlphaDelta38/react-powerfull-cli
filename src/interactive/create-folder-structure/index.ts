import { program } from "../../index.js";
import UnitedActions from "./actions/index.js";

function createFolderStructure(){

    program
        .command('create')
        .description('Initialize React powerfull CLI')
        .action(UnitedActions);


}

export default createFolderStructure;