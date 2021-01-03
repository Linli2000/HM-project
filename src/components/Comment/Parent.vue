<template>
  <div id="app">
    <Parent v-if="parentData.parent"
            :parentData="parentData.parent" />
    <h3>👨这是父评论{{parentData.content }}</h3>
    <!-- 使用递归实现  在组件内部调用自己-->
  </div>
</template>

<script>
export default {
  // 组件内部调用需要用name注册 才能使用 固定写法
  name: 'Parent',
  props: ["parentData"],
  data () {
    return {

    }
  },

  methods: {

  },

  mounted () {

  },
}
</script>

<style lang = "less" scoped>
#app {
  border: 1px solid red;
  margin: 3px;
  padding: 3px;
}
</style>