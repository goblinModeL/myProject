

<template>
  <el-button @click="open">开启弹窗</el-button>
  <div class="page">
    <div class="box">
      <el-text>模拟是否会卡顿</el-text>
    <el-text>{{title}}</el-text>
    <el-input v-model="number"></el-input>
    <el-button @click="join">填入</el-button>
    </div>
    <div class="list">
      <div  v-for="(item,index) in list" class="flexBox">
       <div class="item"> {{item.weight}} </div>
         <div class="item"> {{item.pieces}} </div>
        <el-button @click="choose(item,index)">选择此项</el-button>
           </div>
    </div>
  </div>
  <dig-message  ref="dialogVisibleref" v-model:user="ly" ></dig-message>

</template>

<script setup >

import {ref,reactive ,onMounted} from 'vue'
 import DigMessage from "@/components/methods/digMessage.vue";
 const dialogVisibleref=ref(null)
const number=ref(10)
const title=ref(null)
let  index=ref(0)
const ly=reactive({
  name:'ly',
  age:'18'
})
const list=ref([])
const open=()=>{
   dialogVisibleref.value.dialogVisible=true
 }
 const join=()=>{
   list.value[parseInt(index.value)].weight=number.value

 };
 const choose=(item,index1)=>{
    index.value=index1
    title.value=item.pieces
   console.log(title)
 };
onMounted(()=>{
  list.value.push(...Array.from({length:150},(v,k)=>({
    pieces: k+1+'',
    bubbleType:'1',
    weight:k,
  })))
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