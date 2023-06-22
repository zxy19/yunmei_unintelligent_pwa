import { ProxyRequest } from './proxy';
import { Lock } from '@/entity/Lock';
import md5 from 'md5';
export class YunmeiAPI {
    usernameMD5;

    static Schools = class {
        schoolNo;
        schoolName;
        url;
        token;
    }

    sess;
    userId;
    schoolNo;
    schools;
    authHeader=[]
    async loginAndGetLock() {
        let lockResList;
        let lockForm = {
            schoolNo: this.schoolNo,
            userId: this.userId
        };
        try {
            lockResList =await this.sess.post("/dormuser/getuserlock", lockForm,this.authHeader);
        } catch (e) {
            throw new Error("门锁获取失败");
        }
        let lockRes;
        let locks = [];
        for (let i = 0; i < lockResList.length; i++) {
            let currentLock = new Lock();
            try {
                lockRes = lockResList[i];
                currentLock.label = `${lockRes.buildName}-${lockRes.dormNo}`;
                currentLock.D_SEC = lockRes.lockSecret;
                currentLock.D_CHAR = lockRes.lockCharacterUuid;
                currentLock.D_SERV = lockRes.lockServiceUuid;
                currentLock.D_Mac = lockRes.lockNo;
                currentLock.lockNo = lockRes.lockNo;
                currentLock.schoolNo = this.schoolNo;
                currentLock.username = this.usernameMD5;
                locks.push(currentLock);
            } catch (ignored) {console.log(ignored)}
        }
        return locks;
    }

    async init(username, password, isMd5) {
        if (isMd5 === undefined) isMd5 = false;

        this.sess = new ProxyRequest("https://xypp.cc/proxyHTTP.php","https://base.yunmeitech.com/");
        try {
            if (!isMd5) password = md5(password);

            let loginFormData = {
                userName: username,
                userPwd: password
            };
            let loginRes = await this.sess.post("/login", loginFormData);
            if (!loginRes.success) {
                throw new Error(loginRes.msg);
            }

            let temp = loginRes.o;
            this.userId = temp.userId;
            this.authHeader=[`token_data: ${temp.token}`,`token_userId: ${this.userId}`,`tokenUserId: ${this.userId}`];

            //SCHOOL
            let schoolDat = {
                userId: this.userId
            };
            let schoolList = await this.sess.post("/userschool/getbyuserid", schoolDat,this.authHeader);
            console.log(schoolList);
            this.schools = [];

            for (let j = 0; j < schoolList.length; j++) {
                let schoolRes = schoolList[j];
                let school = new YunmeiAPI.Schools();
                school.schoolNo = schoolRes.schoolNo;
                school.schoolName = schoolRes.school.schoolName;
                school.url = schoolRes.school.serverUrl;
                school.token = schoolRes.token;
                this.schools.push(school);
            }
            this.usernameMD5 = md5(username);
        } catch (e) {
            throw new Error("未知错误"+e);
            // e.printStackTrace();
        }
    }

    setSchool(index) {
        let school = this.schools[index];
        this.sess.setBaseUrl(school.url);
        this.authHeader=[`token_data: ${school.token}`,`token_userId: ${this.userId}`,`tokenUserId: ${this.userId}`];
    }
}