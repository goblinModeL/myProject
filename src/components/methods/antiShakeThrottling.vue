

<template>
  <el-row style="padding: 20px">
    <el-col :span="10"><div class="grid-content ep-bg-purple" />
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>防抖</span>
          </div>
        </template>
        <el-text class="mx-1">无论用户触发多少次事件，对应的回调函数只会在事件停止触发指定事件后执行。</el-text>
        <el-text class="mx-1">就像下面这个数字，无论你点的多快，他都只会在时间到达后+1</el-text><br>
        <el-text class="mx-1" size="large">{{shack}}</el-text>
        <div class="text item" ></div>
        <template #footer>
          <el-button @click="antiShake">防抖触发</el-button>
        </template>
      </el-card>
    </el-col>
    <el-col :span="10"><div class="grid-content ep-bg-purple" />
      <el-card style="max-width: 480px;">
        <template #header>
          <div class="card-header">
            <span>节流</span>
          </div>
        </template>
        <el-text class="mx-1">无论用户触发事件多少次，附加的函数在给定的时间间隔内只会执行一次。</el-text>
        <el-text class="mx-1">就像下面这个数字，无论你点的多快，他在这个时间间隔内只会+1</el-text><br>
        <el-text class="mx-1" size="large">{{number}}</el-text>
        <div class="text item" ></div>
        <template #footer>
          <el-button @click="Throttle">节流触发</el-button>
        </template>
      </el-card>
    </el-col>
  </el-row>


</template>

<script setup lang="ts">
import { ref } from 'vue'
const shack=ref(0)
const number=ref(0)
// 声明一个防抖函数
const debounce=(fun:Function,wait:number)=>{
  let timeout:any=setTimeout;
  return function(this:any,...args:any){
    const context = this;
    clearTimeout(timeout)
    timeout=setTimeout(()=>fun.apply(context,args),wait)
  }
}
// 该函数为点击按钮要出发的函数
const TrueFun=()=>{
  console.log(12123)
  shack.value+=1;
}
// 点击触发
const antiShake=debounce(TrueFun,1000)
//  节流函数
const throttles = (func:Function, limit:number) => {
  let inThrottle=false;  // 是否处于节流限制时间内
  return function(this:any,...args:any) {
    const context = this;
    // 跳出时间限制
    if (!inThrottle) {
      func.apply(context, args);  // 执行回调
      inThrottle = true;
      // 开启定时器计时
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
const changeNumber=()=>{
  console.log(12123)
  number.value+=1;
}
// 点击触发
const Throttle=throttles(changeNumber,1000)
</script>
<style scoped>

</style>