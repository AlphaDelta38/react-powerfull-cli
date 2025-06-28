import { Command } from "commander";

interface IDefaultOptions{
    shortFlag: string
    longFlag: string
    description: string
    defaultValue?: any
}

const defaultOptions = {
    useTypescript: {
        shortFlag: "t",
        longFlag: "useTypescript <boolean>",
        description: "Opportunity to set false, for create js file without ts syntax",
        defaultValue: null
    },
    disableCss: {
        shortFlag: "c",
        longFlag: "ds",
        description: "Just write flag that dont include css",
        defaultValue: false
    },
    disableInterface: {
        shortFlag: "i",
        longFlag: "di",
        description: "Just write flag that dont include interface",
        defaultValue: false
    },
    folder: {
        shortFlag: "f",
        longFlag: "folder <path>",
        description: "Enter the path to the directory for create file(s) (path must started from root directory but without root/)",
        defaultValue: null
    },

}

type propsType = keyof typeof defaultOptions;


export const defaultCommander = (name: string, props?: propsType[]) => {
    const commander = new Command(name)

    if(!props) return commander;

    for (const inputOptionKey of props) {
        const {longFlag, shortFlag, description, defaultValue}: IDefaultOptions = defaultOptions[inputOptionKey]
        commander.option(`-${shortFlag}, --${longFlag}`, description, defaultValue ?? undefined)
    }

    return commander
}
