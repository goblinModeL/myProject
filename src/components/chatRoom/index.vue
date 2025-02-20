

<template>
  <div class="box">
    <p  v-for="(item,index) in wsStore.messages">{{item}}
    </p>
  </div>
  <el-input v-model="text" placeholder="请输入消息。。。" style="max-width: 500px"></el-input>
  <el-button @click="sss"> send</el-button>
</template>

<script setup>
 import  { onMounted,ref,onUnmounted} from "vue";
  import {useWebSocketStore} from "@/store/module/websocket.js";
const  wsStore =useWebSocketStore()
 // const isConnected = computed(() => wsStore.isConnected);
 const sss = ()=>{



   wsStore.sendMessage(username.value,text.value)
 };
 const username = ref("用户" + Math.floor(Math.random() * 1000)); // 随机用户名
 const text=ref("")
 onMounted(()=>{
   if(!wsStore.isConnected){
     wsStore.connect()

   }
 })
 onUnmounted(()=>{
   wsStore.close()
 })
</script>
<style scoped>
.box{
  width: 500px;
  height: 500px;
  overflow: auto;
  border: 1px solid #ccc;
}
</style>