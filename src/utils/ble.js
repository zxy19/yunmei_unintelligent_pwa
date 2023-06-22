export function getDevice(uuid) {
    return navigator.bluetooth.requestDevice({ filters: [{ services: [uuid.toLowerCase()] }] });
}
export function getCharacteristic(device, serviceUuid, characteristicUuid) {
    return device.gatt.connect()
        .then(server => server.getPrimaryService(serviceUuid.toLowerCase()))
        .then(service => service.getCharacteristic(characteristicUuid.toLowerCase()));
}
export function writeCharacteristic(characteristic, data) {
    return characteristic.writeValue(data);
}