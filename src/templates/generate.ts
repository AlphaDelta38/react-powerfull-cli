import fs from 'fs-extra'
import path from "node:path";
import ejs from 'ejs'
import { capitalizeFirstLetter } from '@/utils/text-utils.js'

import type { generateFunctionProps } from "@/templates/types/index.js";


async function generateComponent(props: generateFunctionProps): Promise<void> {
    try {
        props.name = capitalizeFirstLetter(props.name);

        const filename = props?.fileName ?? props.name

        const dirPath = path.join(props.generatedPath, `${props.name}`)
        const outputFile = path.join(dirPath, `${filename}.${props.extension}`);

        const template = await fs.readFile(props.templatePath);
        const rendered = ejs.render(template.toString(), {...props.data, name: props.name});

        await fs.ensureDir(dirPath);
        await fs.writeFile(outputFile, rendered);


        console.log(`✅ ${filename}.${props.extension} successful generated in ${props.generatedPath}`);
    } catch (error) {
        console.error('❌ Error with generation:', error);
    }
}

export default generateComponent;
