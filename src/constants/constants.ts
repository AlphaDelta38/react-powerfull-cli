const hooksConstant: string[] = ["deb", "onClick", "prev", "tog"]

const hookConstantAlias: {[key: string]: string} = {
    deb: "useDeb",
    onClick: "useClickOut",
    prev: "usePrev",
    tog: "useToggle"
}

export {
    hooksConstant,
    hookConstantAlias
}
