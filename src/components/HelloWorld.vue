<template>
  <div class="virtual-list" ref="list" @scroll="handleScroll">
    <div class="list-content" :style="contentStyle">
      <div v-for="(item, index) in visibleItems" :key="index" class="list-item">
        {{ item }}
      </div>
    </div>
  </div>
  <button @click="goOther"> 测试路守卫</button>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      debounces:null,
      data:[],
      itemHeight:30,
      visibleCount:10,
      startIndex: 0, // 显示数据的起始位置
      visibleItems: [] // 当前显示的数据项
    };
  },
  computed: {
    contentStyle() {
      return {
        paddingTop: `${this.startIndex * this.itemHeight}px`, // 上边距，空出之前的项目
        height: `${this.data.length * this.itemHeight}px` // 总高度
      };
    }
  },
  created() {
   this.debounces=this.debounce(this.trueGo, 1000)
    for (let i=0;i<10000 ; i++) {
      this.data.push(i)
    }
  },
  beforeRouteLeave(to, from, next) {
    if(this.startIndex===0){
      alert('请先滚动')
    }
    else {
      next()
    }
  },
  methods: {
    trueGo(){
      console.log('点击了')
    },
    goOther(){

        // this.debounces()
      this.$router.push({path:'/antiShakeThrottling'})
    },
     debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
},
    handleScroll() {
      const list = this.$refs.list;
      const scrollTop = list.scrollTop;

      const startIndex = Math.floor(scrollTop / this.itemHeight); // 计算当前滚动位置对应的数据起始索引

      if (startIndex !== this.startIndex) {
        this.startIndex = startIndex;
        this.updateVisibleItems();
      }
    },
    updateVisibleItems() {

      const endIndex = Math.min(
          this.data.length - 1,
          this.startIndex + this.visibleCount - 1
      );
      this.visibleItems = this.data.slice(this.startIndex, endIndex + 1);
    }
  },
  watch: {
    data() {
      this.updateVisibleItems();
    }
  },
  mounted() {
    this.updateVisibleItems(); // 初始时更新可见项
  }
};
</script>

<style scoped>
.virtual-list {
  overflow-y: auto;
  background: aqua;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px; /* 设置虚拟列表的高度 */
}
.list-content {
  position: relative;
}
.list-item {
  height: 40px; /* 每个项的高度 */
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
