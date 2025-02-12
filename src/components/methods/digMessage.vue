<template>
  <el-dialog
    v-model="dialogVisible"
  title="Tips"
  width="500"
  :before-close="handleClose"
  >
  <span>{{props.user.name}}{{props.number}}</span>
    <el-button @click="changeName">修改父组件的值</el-button>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="closeDialog">Confirm</el-button>
    </div>
  </template>
  </el-dialog>
</template>

<script setup>
import { ref,defineEmits,defineProps,nextTick } from 'vue';
// 接受父组件传过来的值
// const props = defineProps({
//   user: {
//     type: Object,
//     default: {}
//   }
// })
// 或者
const props = defineProps(['user'])
const emit= defineEmits(['update:user']);
const dialogVisible=ref(false)

const handleClose=()=>{
  dialogVisible.value = false
}
const closeDialog=()=>{
  dialogVisible.value = false
}
const changeName=async ()=>{
  props.user.name="newVal"
  // emit('update:user', { ...props.user,name:'newname', });
  await nextTick()
  // emit('update:number', 100);

}
defineExpose({
  dialogVisible
})
</script>

<style scoped>
</style>
