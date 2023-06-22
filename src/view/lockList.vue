<template>

    <el-table :data="list" style="width: 100%">
        <el-table-column prop="label" label="标签"/>
        <el-table-column prop="D_Mac" label="MAC"/>
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default="{row}">
                <el-button link type="primary" size="small" @click="detailClick(row)">详情</el-button>
                <el-button link type="primary" size="small" @click="removeClick(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script setup>
import { Lock } from '@/entity/Lock';
import { useUserDataStore } from '@/store/userData';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter();
const userData=useUserDataStore();
userData.init();
var list = ref(userData.lockList.map(lock=>Lock.fromUrl(lock)));
function detailClick(lock){
    router.push("/lockDetail/"+lock.toString(true));
}
function removeClick(lock){
    userData.removeLock(lock);
    list.value = userData.lockList.map(lock=>Lock.fromUrl(lock));
}
</script>