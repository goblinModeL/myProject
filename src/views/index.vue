

<template>
<!--  <el-button @click="open">开启弹窗</el-button>-->
<!--  <el-text>{{ly.name}}{{ly.age}}</el-text>-->
  <div class="page">

  </div>
  <dig-message  ref="dialogVisibleref" v-model:user="ly" ></dig-message>
</template>

<script setup >
import {ref,reactive } from 'vue'
 import DigMessage from "@/components/methods/digMessage.vue";
 const dialogVisibleref=ref(null)
const number=ref(10)
const ly=reactive({
  name:'ly',
  age:'18'
})
 const open=()=>{
   dialogVisibleref.value.dialogVisible=true
 }

</script>
<style scoped>

</style>