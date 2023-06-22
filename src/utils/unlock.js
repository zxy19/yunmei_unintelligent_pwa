import {getDevice,getCharacteristic,writeCharacteristic} from "./ble.js"

export function unlockProcess(Lock,callback){
    console.log(Lock);
    callback(0,"等待选择设备");
    getDevice(Lock.D_SERV)
    .then(_=>(callback(40,"开始连接"),_))
    .then(Device=>getCharacteristic(Device,Lock.D_SERV,Lock.D_CHAR))
    .then(_=>(callback(70,"写入...."),_))
    .then(Characteristic=>writeCharacteristic(Characteristic,getPwd(Lock.D_SEC)))
    .then(_=>(callback(100,"完成"),_))
    .catch(err=>callback(-1,"",err));
}

function getPwd(secret) {
    let buffer = new ArrayBuffer(1024);
    let view = new DataView(buffer);
    let offset = 0;
    let pw = Math.floor(Math.random() * 1000000);
    view.setUint8(offset++, 208);
    let len = secret.length + 2 + 2 + 10;
    view.setUint8(offset++, len);
    for (let i = 0; i < secret.length; i++) {
        view.setUint8(offset++, secret.charCodeAt(i));
    }
    view.setUint8(offset++, 165);
    for (let i = 0; i < 6; i++) {
        view.setUint8(offset++, pw % 10);
        pw = Math.floor(pw / 10);
    }
    view.setUint8(offset++, 73);
    view.setUint8(offset++, 68);
    view.setUint8(offset++, 48);
    view.setUint8(offset++, 49);

    view.setUint8(offset++, 167);

    return buffer.slice(0, offset);
}