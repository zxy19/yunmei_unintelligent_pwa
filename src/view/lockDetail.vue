<template>
    <el-row>
        <el-col>
            <el-descriptions title="门锁信息" :column="1" border>
                <el-descriptions-item label="LABEL">{{ data.lock.label }}</el-descriptions-item>
                <el-descriptions-item label="S-UUID">{{ data.lock.D_SERV }}</el-descriptions-item>
                <el-descriptions-item label="C-UUID">{{ data.lock.D_CHAR }}</el-descriptions-item>
                <el-descriptions-item label="MAC">{{ data.lock.D_MAC }}</el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>
    <br><br>
    <el-row>
        <el-button @click="shareAlert">分享</el-button>
        <el-button @click="setDef">设为默认</el-button>
    </el-row>
    <el-dialog v-model="data.alertDiag" title="警告" align-center>
        <span>{{ data.alertTxt }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.alertDiag = false">取消</el-button>
                <el-button type="primary" @click="data.alertDiag = false;alertConfirm();">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { Lock } from '@/entity/Lock';
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useUserDataStore } from '@/store/userData';
// import { ElMessage } from 'element-plus'
import {sleep} from '@/utils/common'
import { router } from '@/router';
const userData = useUserDataStore();
userData.init();
const route = useRoute();
const data = reactive({ lock: undefined,alertStep:0,alertDiag:false ,alertTxt:""});
data.lock = Lock.fromUrl(route.params.data);
function shareAlert(){
    data.alertTxt="警告！您正在执行一项非常危险的操作！\n分享您的门锁信息这一行为是不可逆的，门锁的保密数据理论上会伴随一个账号从创建到注销，一旦数据被获取，将会是安全数据的永久性泄露。\n您只应该于您非常非常信任的人或者您自己的其他设备线下共享该信息。\n确定要执行该操作吗？";
    data.alertDiag=true;
    data.alertStep=0;
}
async function alertConfirm(){
    await sleep(500);
    data.alertStep++;
    if(data.alertStep == 1){
        data.alertTxt="警告！您正在执行一项的操作确实是非常危险的！\n您不应该为了图方便而将门锁通过互联网等途径共享给其他人，即便对方急需开门进入寝室\n您只应该于您非常非常信任的人或者您自己的其他设备线下共享该信息。\n再次确定，要执行该操作吗？";
        data.alertDiag=true;
    }
    if(data.alertStep == 2){
        data.alertTxt="确认操作后将在屏幕上显示门锁数据的二维码。如非必要，请不要截图保存或发送给他人。扫码时请关注身边，避免二维码被盗扫。您确定要分享数据吗";
        data.alertDiag=true;
    }
    if(data.alertStep == 3){
        router.push("/lockQR/"+data.lock.toString(true));
    }
}
function setDef(){
    let tmp = Lock.fromUrl(data.lock.toString());
    tmp.label="[默认]"+tmp.label;
    userData.defaultLock=tmp.toString();
    userData.save();
}
</script>