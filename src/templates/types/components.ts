import type { Basic } from "@/templates/types/index.js";
import type {FromUtoI} from "@/types/types";

interface tsxTemplateProps extends Basic {
    data: {
        useCSS: boolean;
        cssType: string
        useTypescript: boolean;
        useInterface: boolean;
        componentType: "fn" | "fc" | "fr";
    }
}

interface cssTemplateProps extends Basic {
    data: {
        useCSS: boolean;
        cssType: string;
    }
}


interface indexTemplateProps extends Basic {
    data: {
        useTypescript: boolean;
    }
}

interface generateTypesForAction extends Basic{
    data: FromUtoI<componentsAllDataTypes>
}

type componentsAllDataTypes =
    | cssTemplateProps['data']
    | tsxTemplateProps['data']
    | indexTemplateProps['data'];

export {
    tsxTemplateProps,
    cssTemplateProps,
    indexTemplateProps,
    generateTypesForAction,
    componentsAllDataTypes,
}
