import type { componentsAllDataTypes } from "@/templates/types/components.js";
import type { customHookTemplateProps, usualHooksTemplateProps } from "@/templates/types/hooks.js";

interface Basic {
    templatePath: string;
    generatedPath: string;
    extension: string;
    name: string;
    fileName?: string
    includePath?: string;
}

type allDataTypes = componentsAllDataTypes | customHookTemplateProps | usualHooksTemplateProps

interface generateFunctionProps extends Basic{
    data: allDataTypes;
}

export {
    Basic,
    generateFunctionProps,
}
