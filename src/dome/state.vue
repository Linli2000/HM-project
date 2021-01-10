<template>
  <div id="app">
    <h1>vuex</h1>
    <!-- 通过插槽this.$store 获取到vuex中的store对象实例  -->
    <div>
      store数据的使用:{{$store.state.const}}
    </div>
    <p>
      计算属性的使用:{{count}}
    </p>

    <p>使用mapState:{{const2}}</p>
    <p>使用mapState:{{const3}}</p>
  </div>
</template>

<script>
// 第三种用法 先映入mapState 再再下面使用 
import { mapState } from 'vuex'
export default {
  // 通过计算属性 吧state属性定义在计算属性里面  count(){} 只是一个名字而已 可以更换
  computed: {
    // ...可以把计算出来的属性全部结构出来
    ...mapState(["const2", "const3"]),
    count () {
      return this.$store.state.const
    }
  }
}
</script>

<style lang = "less" scoped>
</style>