import { resolve } from 'path';
import { getDirname } from "@/utils/utils.js";

import type { ITemplatePathObj } from "@/types/constants.js";


const { __dirname } = getDirname(import.meta.url);


const components: ITemplatePathObj = {
    tsx: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.tsx.ejs'),
    },
    css: {
        path: resolve(__dirname, '../templates/file-templates/components/__name__.module.css.ejs'),
    },
    index: {
        path: resolve(__dirname, '../templates/file-templates/components/index.ts.ejs'),
    },
}

const hooks: ITemplatePathObj = {
    usual: {
        path: resolve(__dirname, '../templates/file-templates/hooks/usual/__name__.hooks.ejs'),
    },
    custom: {
        path: resolve(__dirname, '../templates/file-templates/hooks/hook.ejs'),
    },
}

export {
    hooks,
    components
};
