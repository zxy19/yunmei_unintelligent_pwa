<template>
    <el-row justify="center">
        <el-badge value="PWA" class="item">
            <h2>云梅不智能</h2>
        </el-badge>
    </el-row>
    <br><br>
    <el-row justify="center">
        <el-progress type="dashboard" :percentage="data.process">
            <template #default="{}">
                <span class="percentage-label">{{ data.text }}</span>
            </template>
        </el-progress>
    </el-row>
    <br><br>
    <el-row justify="center">
        使用
        <el-select v-model="data.curLock" class="m-2" size="small">
            <el-option v-for="lock in data.lockList" :key="lock.key" :value="lock.value" :label="lock.label" />
        </el-select>
        开门
    </el-row><br><br>
    <el-row justify="center">
        <ElButton @click="unlockProcess(Lock.fromUrl(data.curLock), processShow)" size="large" round type="primary">开门
        </ElButton>
    </el-row>
    <br><br>
    <el-row justify="center">
        <el-col :span="6">
            <router-link to="/lockList">
                <ElButton circle size="large" type="info">设置</ElButton>
            </router-link>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="6" style="text-align: right;">
            <router-link to="/login">
                <ElButton circle size="large" type="info">登录</ElButton>
            </router-link>
        </el-col>
    </el-row>
    <el-row justify="center"><a target="_blank" href="https://yunmei.xypp.cc/pwa/">关于</a></el-row>
</template>

<script setup>
import { Lock } from "../entity/Lock"
import { reactive } from 'vue'
import { unlockProcess } from '../utils/unlock.js'
import { useUserDataStore } from "@/store/userData"
const userData = useUserDataStore();
userData.init();
let lockDataList = userData.lockList;
const data = reactive({ curLock: "", lockList: [], process: 0, text: "点击开锁按钮" });
data.lockList = lockDataList.map(Lock.fromUrl);
data.lockList = data.lockList.map(lock => ({ value: lock.toString(), label: lock.label, key: lock.toString() }));
data.curLock = (data.lockList[0] || {}).value;
function processShow(pss, desc, errobj) {
    if (errobj) {
        pss = 0;
        desc = "出错了";
        if (errobj.toString() == "NotFoundError: Bluetooth adapter not available.") {
            desc = "未找到蓝牙适配器";
        } else if (errobj.toString() == "NotFoundError: User cancelled the requestDevice() chooser.") {
            desc = "您取消了选择";
        } else if (errobj.toString() == "NetworkError: Connection Error: Connection attempt failed.") {
            desc = "连接失败";
        }
        console.log(errobj.toString());
    }
    data.process = pss;
    data.text = desc;
}
</script>