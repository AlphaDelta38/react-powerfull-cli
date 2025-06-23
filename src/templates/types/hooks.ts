import type { Basic } from "@/templates/types/index.js";

interface customHookTemplateProps extends Basic {
    data: {
        useTypescript: boolean;
        useInterface: boolean;
    }
}

interface usualHooksTemplateProps extends Basic {
    data: {
        useTypescript: boolean;
        usePrev: boolean;
        useDeb: boolean;
        useClickOut: boolean;
        useToggle: boolean;
    }
}

export {
    customHookTemplateProps,
    usualHooksTemplateProps,
}
