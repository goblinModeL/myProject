

<template >
  <div class="login">
<!--  <el-button @click="open">开启弹窗</el-button>-->
  <dig-message  ref="dialogVisibleref" v-model:user="ly" ></dig-message>
 <el-card>
   <template #header>
     <div class="card-header">
       <span>{{login_register?'登录':"注册"}}</span>
     </div>
   </template>
   <transition name="fade" mode="out-in">
   <el-form :model="user" label-width="auto" style="min-width: 400px;height: 200px">
     <el-form-item label="用户名">
       <el-input v-model="user.username" placeholder="请输入用户名" ></el-input>
     </el-form-item>
     <el-form-item label="密码">
       <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
     </el-form-item>
     <el-form-item label="确认密码" v-if="!login_register">
       <el-input v-model="user.password1" placeholder="请确认密码"  type="password"></el-input>
     </el-form-item>

   </el-form>
   </transition>
   <el-button style="width: 240px" @click="submit">{{login_register?"登录":"注册"}}</el-button>
   <el-text class="register"   @click="registerChange" >{{ !login_register?"点此登录":"点此注册"}}</el-text>
 </el-card>



  </div>

</template>

<script setup >

import {ref,reactive ,onMounted} from 'vue'
import DigMessage from "@/components/methods/digMessage.vue";
import {login,register} from "@/utils/interface.js";
import {ElMessage, ElMessageBox} from "element-plus";
import { useRouter } from "vue-router";

 const dialogVisibleref=ref(null)
const number=ref(10)
const  login_register =ref(true)
const ly=reactive({
  name:'ly',
  age:'18'
})
const router = useRouter();
const open=()=>{
   dialogVisibleref.value.dialogVisible=true
 }
const user=reactive({
  username:"",
  password:"",
  password1:"",
})
// 切换注册
const registerChange=()=>{
  user.password=""
  user.password1=""
  user.username=""
  login_register.value=!login_register.value
}
const submit=()=>{
   if(login_register.value) {
     login(
         "/user/login", user
     ).then((data) => {
      ElMessage.success("登录成功")
       sessionStorage.setItem("token", data.token)
       sessionStorage.setItem("userName", user.username)
       sessionStorage.setItem("userId", data.id)
       setTimeout(()=>{
         router.push({path:"/pinias",query:{}})
       },1500)
     }).catch(err => {
       ElMessage.error(err)
     })
   }
   else{
     register(
         "/user/register", user
     ).then(res => {
  if(res.code==200){
    ElMessage.success("注册成功")
    ElMessageBox.confirm('是否返回登录页?',{
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
        .then(() => {
          registerChange()
        })
        .catch(() => {

        })
  }
     }).catch(err => {
       ElMessage.error(err.message)
     })
   }
}
onMounted(()=>{

})
</script>
<style scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}
.el-card{
  min-width: 300px;
  width: 100%;
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
:deep(.el-card__body){
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register{
position: absolute;
  bottom: 40px;
  right: 20px;
  cursor: pointer;
}
/* 动画样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>