import inquirer from 'inquirer'


async function size() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'size',
            message: 'Choose size of project structure:',
            choices: ['large', 'middle', 'small'],
            default: 'middle',
        }
    ]);
}

export default size;
