export const generateCode = length => {
    return Math.random().toString(36).substr(2,length).split("").map(e=>Math.random()<Math.random()?e.toUpperCase():e).join().replace(/,/g,"");
}