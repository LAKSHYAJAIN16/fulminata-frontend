export function s(array) {
    if (array.length == 0) return "s";
    return array.length == 1 ? "" : "s";
}

export function snum(num) {
    if (num == 0) return "";
    return num == 1 ? "" : "s";
}
