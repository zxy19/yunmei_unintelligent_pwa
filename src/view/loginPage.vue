<template>
  <h1>登录到云莓智能</h1>
  <el-alert title="您的账号信息将经过我们的服务器。关于我们如何处理这些数据，请查看首页-关于" type="warning" />
  <el-input v-model="input.userName" placeholder="云莓智能账号" />
  <el-input v-model="input.password" type="password" placeholder="云莓智能密码" show-password />
  <el-button @click="login">{{data.loginStat}}</el-button>
  <el-select v-if="data.schoolList.length" @change="schoolSelect" v-model="input.schoolNo" class="m-2" placeholder="选择学校" size="large">
    <el-option
      v-for="(item,index) in data.schoolList"
      :key="item.schoolNo"
      :label="item.schoolName"
      :value="index"
    />
  </el-select>
  <el-select v-if="data.schoolList.length" @change="lockSelected" v-model="data.lockSelect" class="m-2" placeholder="选择锁" size="large">
    <el-option
      v-for="item in data.lockList"
      :key="item.label"
      :label="item.label"
      :value="item"
    />
  </el-select>
</template>
<script setup>
import { reactive } from "vue"
import { YunmeiAPI } from "@/utils/yunmei"
import { useRouter } from "vue-router";
const router = useRouter();
const input = reactive({ userName: "", password: "",schoolNo:-1 });
const data = reactive({lockSelect:undefined,lockList:[],schoolList:[],loginStat:"登录"});
const api = new YunmeiAPI();
async function login() {
  try{await api.init(input.userName, input.password, false)}catch(e){
    data.loginStat="登录失败"+e.toString();
  }
  console.log(api.schools);
  data.schoolList = api.schools;
  input.schoolNo="请选择学校";
}
async function schoolSelect(){
  api.setSchool(parseInt(input.schoolNo));
  data.lockSelect="正在加载门锁";
  data.lockList = await api.loginAndGetLock();
  data.lockSelect="请选择门锁";
}
function lockSelected(){
  router.push("/lock_info/"+data.lockSelect.toString(true));
}
</script> 