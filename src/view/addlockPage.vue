<template>
    <el-row><h1>添加门锁</h1></el-row>
    <el-row>名字：<el-input v-model="data.lock.label" /></el-row>
    <el-row>
        <el-col>
            <el-descriptions title="门锁信息" :column="1" border>
                <el-descriptions-item label="LABEL">{{ data.lock.label }}</el-descriptions-item>
                <el-descriptions-item label="S-UUID">{{ data.lock.D_SERV }}</el-descriptions-item>
                <el-descriptions-item label="C-UUID">{{ data.lock.D_CHAR }}</el-descriptions-item>
                <el-descriptions-item label="MAC">{{ data.lock.D_Mac }}</el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row><br><br>
    <el-row>
        <el-button type="primary" size="large" @click="addLockWork">添加</el-button>
        <a :href="data.appLink" target="black" size="large">
            <el-button type="info">App打开</el-button>
        </a>
    </el-row>
</template>
<script setup>
import { Lock } from '@/entity/Lock';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useUserDataStore } from '@/store/userData';
import { ElMessage } from 'element-plus'
const userData = useUserDataStore();
userData.init();
const route = useRoute();
const router = useRouter();
const data = reactive({ lock: undefined ,appLink:""});
data.lock = Lock.fromUrl(route.params.data);
data.appLink="yunmeiui://lock_info/"+data.lock.toString(true);
function addLockWork() {
    let a = false;
    userData.lockList.forEach(lockDatStr => {
        if (Lock.fromUrl(lockDatStr).label == data.lock.label) {
            ElMessage("该名称已存在");
            a = true;
        }
    })
    if (a) return;
    userData.addLock(data.lock);
    router.push("/");
}
</script>