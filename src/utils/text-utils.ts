
function capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function toCamelCase(text: string, separator: string): string {
    return text.split(separator).map(capitalizeFirstLetter).join("");
}

export {
    toCamelCase,
    capitalizeFirstLetter
}
