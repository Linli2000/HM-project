<template>
  <div id="app">
    <div>
      <!-- 1.0 导航栏 -->
      <van-nav-bar title="精彩跟帖"
                   left-text="返回"
                   left-arrow
                   @click-left="$router.back()" />
      <div class="comment_list">
        <CommentMain v-for="item in commentList"
                     :key="item.id"
                     :commentData="item" />
      </div>

    </div>
  </div>
</template>

<script>
// 导入组件 就是评论总页面
import CommentMain from "@/components/Comment/Main"

import { getPostCommentById } from '@/api'
export default {
  components: {
    CommentMain
  },
  data () {
    return {
      commentList: []
    }
  },

  methods: {

  },

  mounted () {
    // 拿到路由传参的数据  后台接口需要
    const { id } = this.$route.params
    // 因为这个已经有接口了 跟前面跳转过来的是一样的评论 所以只需要调用就好
    getPostCommentById(id).then((res) => {
      this.commentList = res.data.data
    })
  },
}
</script>

<style lang = "less" scoped>
</style>