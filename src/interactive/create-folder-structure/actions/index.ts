import chalk from "chalk";
import sizeAnswer from './choose-size.js'
import settingsAnswer from './project-settings.js'
import folderStructureCreator from "../logic/folder-structure-creator.js";
import { GeneralConfigManager } from "@/utils/config-utils.js";

async function UnitedActions(){
    console.log(chalk.cyanBright('Initialize project settings...\n'));

    const size = await sizeAnswer()
    const settings = await settingsAnswer()

    GeneralConfigManager.write(settings)
    folderStructureCreator(size.size, true)

    console.log(chalk.cyanBright(`CLI config has been created successfully.`)
    );

}

export default UnitedActions;