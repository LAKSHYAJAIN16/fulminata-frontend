export function isWhiteSpace(str) {
    let final = toString(str);
    let finalCharArray = final.split('');
    for (let i = 0; i < finalCharArray.length; i++) {
        const element = finalCharArray[i];
        if (element != " "){
            return false;
        }
    }

    return true;
}