<template>
        <el-row justify="center">
            <h1>请妥善保管此二维码</h1>
        </el-row>

    <el-row justify="center">
        <VueQrcode :value="data.lock.toString()" :size="300"></VueQrcode>
    </el-row>
</template>
<script setup>
import { Lock } from '@/entity/Lock';
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import VueQrcode from 'qrcode.vue';
const route = useRoute();
const data = reactive({ lock: undefined});
data.lock = Lock.fromUrl(route.params.data);
</script>