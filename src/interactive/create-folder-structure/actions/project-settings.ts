import inquirer from "inquirer";
import path from "node:path";
import fs from "node:fs";
import { createFolder } from "../../../utils/file-utils.js";

async function settings() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'rootDir',
            message: 'Choose root dir of project:',
            default: 'src',
            validate: (input: string) => {
                const pathRes = path.resolve(process.cwd(), input);
                if (fs.existsSync(pathRes)) {
                    return true;
                }

                createFolder(pathRes)
                return true
            }
        },
        {
            type: 'list',
            name: 'type',
            message: 'Choose the type of file in project:',
            choices: ['javascript', 'typescript'],
        },
        {
            type: 'input',
            name: 'css-type',
            message: 'Enter the type of css preprocessor or use default:',
            default: "css"
        },
    ])
}

export default settings;
