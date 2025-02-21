

<template>
 <div class="father">
    <el-row   :gutter="16">
      <el-col :span="6">
        <el-form :inline="true" :model="Form" class="demo-form-inline">
          <el-form-item label=" 发送人">
            <el-select v-model="Form.formUser"    style="width: 240px" @change="change">
              <el-option label="李扬" value="ly" />
              <el-option label="张" value="zjj" />
              <el-option label="河" value="dy" />
            </el-select>
          </el-form-item>
          <el-form-item label="接收人">
            <el-select
                :disabled="!Form.formUser"
                v-model="Form.toUser"
                placeholder="选择接收人"
                size="large"
                style="width: 240px"
            >
              <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="box">
        <p  v-for="(item,index) in wsStore.messages">{{item}}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="text" placeholder="请输入消息。。。" style="max-width: 500px"></el-input>
        <el-button @click="open">连接ws</el-button>
        <el-button @click="close">关闭ws</el-button>
        <el-button @click="sss">send</el-button>
      </el-col>
    </el-row>
 </div>


</template>

<script setup>
 import  { onMounted,ref,onUnmounted,reactive} from "vue";
  import {useWebSocketStore} from "@/store/module/websocket.js";
 import {ElMessage} from "element-plus";
const  wsStore =useWebSocketStore()
 // const isConnected = computed(() => wsStore.isConnected);
 // 表单数据
 const Form=reactive({
   toUser:"",
   formUser:"",
 })
 const  userList=reactive([
   {
     label:"李扬",
     value:"ly"
   },
   {
     label:"张",
     value:"zjj"
   },
   {
     label:"河",
     value:"dy"
   },
 ])
 const  change=(val)=>{
   Form.toUser="";
   userList.forEach(item=>{
     if(item.value===val){
       item.disabled=true;
     }
     else{
       item.disabled=false;
     }
   })

 }
 const sss = ()=>{

   wsStore.sendMessage( Form.formUser,text.value)
 };
 const open = ()=>{

   if(!wsStore.isConnected&&Form.toUser&&Form.formUser){
     wsStore.connect(Form.formUser,Form.toUser)
   }
   else{
     ElMessage.error("请先选择接收人和发送人")
   }
 };
 const close = ()=>{
  wsStore.close();
 };
 const text=ref("")
 onMounted(()=>{

 })
 onUnmounted(()=>{
   wsStore.close()
 })
</script>
<style scoped>
.box{

  height: 500px;
  overflow: auto;
  border: 1px solid #ccc;
}
.father{
  padding: 0 20px;
}
</style>