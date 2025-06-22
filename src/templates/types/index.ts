import type { componentsAllDataTypes } from "@/templates/types/components.js";

interface Basic {
    templatePath: string;
    generatedPath: string;
    extension: string;
    name: string;
    fileName?: string
}

type allDataTypes = componentsAllDataTypes

interface generateFunctionProps extends Basic{
    data: allDataTypes;
}

export {
    Basic,
    generateFunctionProps,
}
