import { Base64 } from 'js-base64';
const DATA_VER = "1.2";
class Lock {
    constructor(
        label = "未添加门锁",
        d_mac = "",
        d_serv = "",
        d_lock = "",
        d_sec = "",
        _username = "",
        _schoolNo = "",
        _lockNo = ""
    ) {
        this.label = label;
        this.D_Mac = d_mac;
        this.D_CHAR = d_serv;
        this.D_SERV = d_lock;
        this.D_SEC = d_sec;
        this.schoolNo = _schoolNo;
        this.lockNo = _lockNo;
        this.username = _username;
    }

    removeSec() {
        this.D_SEC = "";
        this.username = "";
        this.lockNo = "";
        this.schoolNo = "";
    }

    toString(headless = false) {
        let body =
            this.label +
            "|" +
            this.D_Mac +
            "|" +
            this.D_CHAR +
            "|" +
            this.D_SERV +
            "|" +
            this.D_SEC +
            "|" +
            this.username +
            "|" +
            this.schoolNo +
            "|" +
            this.lockNo +
            "|" +
            DATA_VER;
        if (this.D_SEC === "") {
            return (
                (headless ? "" : "https://yunmeiui.xypp.cc/#/lock_id/") + Base64.encode(body)
            );
        }
        return (
            (headless ? "" : "https://yunmeiui.xypp.cc/#/lock_info/") + Base64.encode(body)
        );
    }
}
Lock.fromUrl = function (Url) {
    let lock = new Lock();
    if (Url.includes("addlock/")) {
        Url = Url.substring(Url.indexOf("addlock/") + 8);
        Url = Base64.decode(Url);
    }
    else if (Url.includes("lock_id/")) {
        Url = Url.substring(Url.indexOf("lock_id/") + 8);
        Url = Base64.decode(Url);
    }
    else if (Url.includes("lock_info/")) {
        Url = Url.substring(Url.indexOf("lock_info/") + 10);
        Url = Base64.decode(Url);
    }
    else if (Url.includes("lockInfo/")) {
        Url = Url.substring(Url.indexOf("lockInfo/") + 9);
        Url = Base64.decode(Url);
    }
    else {
        try {
            Url = Base64.decode(Url);
        }catch(e){e}
    }

    let us = Url.split("|");
    if (us.length == 4) {
        let us_cp = new Array(5);
        us_cp[0] = "account";
        us_cp.splice(1, 4, ...us);
        us = us_cp;
    }
    if (us.length >= 5) {
        lock.label = us[0];
        lock.D_Mac = us[1];
        lock.D_CHAR = us[2];
        lock.D_SERV = us[3];
        lock.D_SEC = us[4];
    }
    if (us.length >= 8) {
        lock.username = us[5];
        lock.schoolNo = us[6];
        lock.lockNo = us[7];
    }
    return lock;
};
export { Lock };
