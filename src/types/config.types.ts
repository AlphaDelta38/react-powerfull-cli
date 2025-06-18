export interface IProjectSizeType {
    small: {
        components: any;
        pages: any;
    };

    middle: {
        components: any;
        pages: any;
        assets: any;
        features: any;
        routes: any;
        services: any;
        store: any;
        utils: any;
        hooks: any;
    };

    large: {
        app: {
            store: any;
            router: any;
            i18n: any;
            theme: any;
        };
        shared: {
            components: any;
            utils: any;
            hooks: any;
            types: any;
        };
        entities: any;
        features: any;
        widgets: any;
        pages: any;
    };

    [key: string]: string | {}
}

export interface ConfigTypes{
    rootDir: string,
    structure?: IProjectSizeType | any
    generationPaths?: {
        [key: string]: string
    },
    [key: string]: any
}


export interface IPathResult{
    [key: string]: string | null | IPathResult
}

