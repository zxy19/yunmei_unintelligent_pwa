import md5 from 'md5';
export class User {
    static CURVER = "1.1";
    ver = "";
    username;
    usernameMD5;
    passwordMD5;

    constructor(username, password) {
        this.username = this.usernameMD5 = this.passwordMD5 = "";
        this.ver = User.CURVER;
        if (username && password) {
            this.username = username;
            this.usernameMD5 = md5(username);
            this.passwordMD5 = password;
        }
    }

    fromString(data) {
        let us = data.split("|");
        if (us.length >= 3) {
            this.username = us[0];
            this.usernameMD5 = us[1];
            this.passwordMD5 = us[2];
        }
    }

    toString() {
        return `${this.username}|${this.usernameMD5}|${this.passwordMD5}|${this.ver}`;
    }
}