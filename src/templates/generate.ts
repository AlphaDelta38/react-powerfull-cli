import fs from 'fs-extra'
import path from "node:path";
import ejs from 'ejs'
import { GeneralConfigManager } from "@/utils/config-utils.js";

import type { generateFunctionProps } from "@/templates/types/index.js";


async function generateComponent(props: generateFunctionProps, withSeparateFolder: boolean = false): Promise<void> {
    try {
        const filename = props?.fileName ?? props.name

        const dirPath = path.join(
            GeneralConfigManager.read().rootDir ?? "",
            props.generatedPath,
            withSeparateFolder ? `${props.name}` : ""
        )
        const outputFile = path.join(dirPath, `${filename}.${props.extension}`);

        const template = await fs.readFile(props.templatePath);
        const options = {
            ...(props.includePath && { views: [props.includePath] })
        };

        const rendered = ejs.render(
            template.toString(),
            { ...props.data, name: props.name },
            options
        );

        await fs.ensureDir(dirPath);
        await fs.writeFile(outputFile, rendered);

        console.log(`✅ ${filename}.${props.extension} successful generated in ${props.generatedPath}`);
    } catch (error) {
        console.error('❌ Error with generation:', error);
    }
}

export default generateComponent;
