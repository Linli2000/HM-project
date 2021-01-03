<template>
  <div id="app">
    <h3>这是展示测试页面</h3>
    <CommentMain v-for="item in commentList"
                 :key="item.id"
                 :commentData="item" />
    <!--   :commentData="item" 发给子组件的值 -->
  </div>
</template>

<script>
// 导入子组件 CommentMain 
import CommentMain from '../components/Comment/Main.vue'
export default {
  components: {
    CommentMain
  },
  data () {
    return {
      commentList: [
        { id: 1, content: "老铁没毛病1" },
        { id: 2, content: "老铁扎心了2" },
        { id: 3, content: "看了个寂寞3" },
        { id: 4, content: "愣着干嘛，扣64" },
        { id: 5, content: "从前有座山5" },
        {
          id: 6,
          content: "山里有座庙6",
          // 被回复的父评论
          parent: { id: 5, content: "从前有座山5" },
        },
        {
          id: 7,
          content: "你懂个啥寂寞",
          parent: { id: 3, content: "看了个寂寞" },
        },
        {
          id: 8,
          content: "庙里有个小和尚",
          parent: {
            id: 6,
            content: "山里有座庙",
            // 被回复的父评论
            parent: { id: 5, content: "从前有座山" },
          },
        },
        {
          id: 9,
          content: "老和尚对小和尚说",
          parent: {
            id: 8,
            content: "庙里有个小和尚",
            parent: {
              id: 6,
              content: "山里有座庙",
              // 被回复的父评论
              parent: { id: 5, content: "从前有座山" },
            },
          },
        },
      ],
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