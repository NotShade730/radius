export const capitalize = (str:string) => {
    if(str) {
        str = str.toLowerCase()
        return str.replace(/^\w/, c => c.toUpperCase());
    } else {
        return '';
    }
};