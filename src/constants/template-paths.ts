import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import type { ITemplatePathObj } from "@/types/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const components: ITemplatePathObj = {
    main: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.tsx.ejs'),
        allowProps: ["name", "useCSS", "useTypescript", "useInterface", "componentType"]
    },
    css: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.module.css.ejs'),
        allowProps: ["name"]
    },
    index: {
        path: resolve(__dirname, '../templates/file-templates/components/index.ts.ejs'),
        allowProps: ["name"]
    },
}

export {
    components
};
