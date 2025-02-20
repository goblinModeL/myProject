

<template>
<h1>{{store.age}}</h1>
 <h1>{{store.name}}</h1>
  <h2>{{dy}}</h2>
</template>

<script setup >
import {onMounted,ref } from  'vue'
import { userState} from '@/store/module/user.js'
const store = userState()
const dy=ref(null)
onMounted(() => {
  store.name="zjj"
 dy.value= store.getUserById(10086)
  setTimeout(()=>{
    store.name="延迟"
  },3000)
})
</script>
<style scoped>

</style>