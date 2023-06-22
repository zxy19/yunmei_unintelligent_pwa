export function sleep(time){
    return new Promise((s)=>setTimeout(s,time));
}