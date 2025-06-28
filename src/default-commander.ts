import { Command } from "commander";

interface IDefaultOptions{
    shortFlag: string
    longFlag: string
    description: string
    defaultValue?: any
}

const defaultOptions = {
    disableTypescript: {
        shortFlag: "t",
        longFlag: "disable-typescript",
        description: "Switch to javascript extension within creating current template",
        defaultValue: false
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
