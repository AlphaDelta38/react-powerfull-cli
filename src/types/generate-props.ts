
interface Basic {
    templatePath: string;
    generatedPath: string;
    extension: string;
    name: string;
    fileName?: string
}


interface generateComponents{
    useCSS: boolean;
    useTypescript: boolean;
    useInterface: boolean;
    componentType: "fn" | "fc" | "fr";
    cssType: string
}


type allDataTypes = generateComponents


interface generateProps extends Basic{
    data: allDataTypes;
}

export {
    generateComponents,
    generateProps
}
