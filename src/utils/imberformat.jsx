export function imberformat(imber){
    if(imber > 0){
        let temp = Math.abs(imber) / 5;
        return Math.abs(Math.floor(temp));
    }

    return Math.abs(imber) + 16;
}