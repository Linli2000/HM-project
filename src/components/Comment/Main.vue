<template>
  <div id="app">
    <CommentParent v-if="commentData.parent"
                   :parentData="commentData.parent" />
    <h3>🤞这是主评论{{commentData.content }}</h3>
  </div>
</template>

<script>
// 引入parent 组件  让数据在一个页面显示
import CommentParent from '../Comment/Parent.vue'
export default {
  props: ["commentData"],
  components: {
    CommentParent
  },
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
</style>