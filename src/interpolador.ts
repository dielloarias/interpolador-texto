export function substitui(template: string, searchValue: string, replaceValue: string): string {
    const regex = new RegExp(searchValue, "g");
    const t = template.replace(regex, replaceValue);
    return t;
}