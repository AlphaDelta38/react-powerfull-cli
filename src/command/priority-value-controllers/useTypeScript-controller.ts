import { GeneralConfigManager } from "@/utils/config-utils.js";
import PriorityValueController from "@/command/priority-value-controllers/index.js";

function createUseTypeScriptController() {
    const instance = new PriorityValueController(GeneralConfigManager);

    instance.placeManyAt(["path useTypescript", true], [1, 2])

    return instance;
}

export default createUseTypeScriptController;
