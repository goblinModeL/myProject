

<template>
 <div class="father">
    <el-row   :gutter="16">
      <el-col :span="6">
        <el-form :inline="true" :model="Form" class="demo-form-inline" >
          <el-form-item label="接收人" style="width: 90%">
            <el-select
                @change="change"
                v-model="Form.toUser"
                placeholder="选择接收人"


            >
              <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"

              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="box">
        <p  v-for="(item,index) in wsStore.messages">{{item.name}}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="text" placeholder="请输入消息。。。" style="max-width: 500px"></el-input>
        <el-button @click="sss">send</el-button>
      </el-col>
    </el-row>
 </div>


</template>

<script setup>
 import  { onMounted,ref,onUnmounted,reactive} from "vue";
  import {useWebSocketStore} from "@/store/module/websocket.js";
 import {ElMessage} from "element-plus";
 import {chatHistory, getAllUsers} from "@/utils/interface.js";
const  wsStore =useWebSocketStore()
 // const isConnected = computed(() => wsStore.isConnected);
 // 表单数据
 const Form=reactive({
   toUser:"",
 })
 const userName=ref(sessionStorage.getItem("userName"))
 const userId=ref(sessionStorage.getItem("userId"))
 const  userList=ref([

 ])
 const  change=(val)=>{
 //  改变后清空聊天记录
 //    重置ws 获取聊天记录
   if(val){
     if(wsStore.isConnected) {
       wsStore.close();
     }
     wsStore.messages=[]
     wsStore.connect(userName.value, Form.toUser)
     chatHistory()
   }
 }
 // 获取聊天记录
 const getChatRecord=()=>{
   chatHistory('/user/chatHistory',{formId:userName.value, toId:Form.toUser})

 }
 const sss = ()=>{

   wsStore.sendMessage(userName.value,text.value)
 };

 const text=ref("")
 onMounted(()=>{
   getAllUsers("/user/getAllUsers",userId.value).then(res=>{
     console.log(res.code)
     if(res.code==200){
       userList.value = res.data.map(user => ({
         label: user.userName,  // 将 name 转为 label
         value: user.id,    // 将 id 转为 value
       }));
       console.log(userList)
     }

   }).catch(error=>{
     ElMessage.error(error)
   })
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