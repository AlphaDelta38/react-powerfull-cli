import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import type { ITemplatePathObj } from "@/types/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const components: ITemplatePathObj = {
    main: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.tsx.ejs'),
    },
    css: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.module.css.ejs'),
    },
    index: {
        path: resolve(__dirname, '../templates/file-templates/components/index.ts.ejs'),
    },
}

export {
    components
};
