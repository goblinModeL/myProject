

<template>
<!--  <el-button @click="open">开启弹窗</el-button>-->
  <dig-message  ref="dialogVisibleref" v-model:user="ly" ></dig-message>
  <el-form :model="user" label-width="auto" style="max-width: 600px">
    <el-form-item label="用户名">
      <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password"></el-input>
    </el-form-item>
  </el-form>
  <el-button style="width: 240px" @click="submit">登录</el-button>
</template>

<script setup >

import {ref,reactive ,onMounted} from 'vue'
 import DigMessage from "@/components/methods/digMessage.vue";
import {login} from "@/utils/interface.js";
 const dialogVisibleref=ref(null)
const number=ref(10)
const ly=reactive({
  name:'ly',
  age:'18'
})
const open=()=>{
   dialogVisibleref.value.dialogVisible=true
 }
const user=reactive({
  username:"",
  password:"",
})
const submit=()=>{
   login(
       "/user/login",user
   ).then(res=>{
     console.log(res)
   }).catch(err=>{
     console.log(err)
   })
}
onMounted(()=>{

})
</script>
<style scoped>
.box{
  width: 300px;

}
.list{
  height: 1500px;
  border: aqua 1px solid;
  overflow-y: scroll;
}
.flexBox{
  flex-direction: row;
  display: flex;
}
.item{
  height: 20px;
  width: 150px;
  text-align: center;
}
</style>