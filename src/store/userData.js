import { Lock } from '@/entity/Lock';
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserDataStore = defineStore('userData', () => {
    var _lockList = ref([]);
    var lockList = ref([]);
    var userList = ref([]);

    var defaultLock = ref(null);
    var unlockOnEntry = ref(false);
    function init() {
        this.lockList = JSON.parse(localStorage.getItem("lockList") || "[]");
        this._lockList = JSON.parse(localStorage.getItem("lockList") || "[]");
        this.userList = JSON.parse(localStorage.getItem("userList") || "[]");

        this.defaultLock = localStorage.getItem("defaultLock");
        if (this.defaultLock) {
            this.lockList.unshift(this.defaultLock);
        }
        this.unlockOnEntry = localStorage.getItem("unlockOnEntry") == "true";
    }
    function save() {
        localStorage.setItem("lockList", JSON.stringify(this._lockList))
        localStorage.setItem("userList", JSON.stringify(this.userList))
        localStorage.setItem("defaultLock", (this.defaultLock || "").toString())
        localStorage.setItem("unlockOnEntry", this.unlockOnEntry ? "true" : "false")
        this.init();
    }
    function addLock(_Lock) {
        this._lockList.push(_Lock.toString());
        this.lockList.push(_Lock.toString());
        this.save();
    }
    function addUser(User) {
        this.userList.push(User.toString());
        this.save();
    }
    function removeLock(lock) {
        lock=Lock.fromUrl(lock.toString());
        this._lockList=this._lockList.filter(function (el) {
            return Lock.fromUrl(el).label != lock.label;
        });
        this.lockList=this.lockList.filter(function (el) {
            return Lock.fromUrl(el).label != lock.label;
        });
        this.save();
    }
    return { lockList, _lockList, userList, defaultLock, unlockOnEntry, init, addLock, addUser, save,removeLock }
})