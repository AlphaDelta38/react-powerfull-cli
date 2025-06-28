import { isExist } from "@/utils/utils.js";
import { ConfigManager } from "@/utils/config-utils.js";

class PriorityValueController{
    protected priorityQueue: Array<any> = []

    constructor(private configManager: ConfigManager) {
    }

    get(){
        for (const element of this.priorityQueue) {
            if(element == "false" || element == "true") return element == "true";

            if(typeof element === "string" && !element.includes("path") && isExist(element)) return element;

            if(typeof element === "string" && element.includes("path")){
                const path = element.split("path")[1];
                const keys = path.split("/").map(key => key.trim());

                let result = this.configManager.read();

                for (const key of keys) {
                    if (result == null || !(key in result)) break;
                    result = result[key];
                }

                if (isExist(result)) {
                    return result;
                }
            }

            if (isExist(element) && element) return element;
        }

        return false;
    }

    placeAt(value: any, index: number){
        const beforePart = this.priorityQueue.slice(0, index - 1)
        const afterPart = this.priorityQueue.slice(index - 1)

        this.priorityQueue = [...beforePart, value, ...afterPart]
    }

    placeManyAt(value: any[], index: number[]){
        for (let i = 0; i < index.length; i++) {
            this.placeAt(value[i], index[i]);
        }
    }

}


export default PriorityValueController;
