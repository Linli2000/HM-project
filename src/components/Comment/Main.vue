<template>
  <div id="app">
    <div class="top">
      <img v-if="commentData.user.head_img"
           class="avator"
           :src="$baseURL+commentData.user.head_img"
           alt="">
      <img class="avator"
           src="@/assets/1.png"
           alt="">
      <div class="info">
        <div class="nickname">{{commentData.user.nickname}}</div>
        <div class="create_date">{{commentData.create_date.slice(0,10)}}</div>
      </div>
      <span class="reply"
            @click="replyHandle">回复</span>
    </div>

    <CommentParent v-if="commentData.parent"
                   :parentData="commentData.parent" />
    <h3>🤞这是主评论{{commentData.content }}</h3>
  </div>
</template>

<script>
// 引入parent 组件  让数据在一个页面显示
import CommentParent from '../Comment/Parent.vue'

// 导入事件总线
import Bus from "@/utils/Bus"
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
    replyHandle () {
      // 点击回复的时候就向另外一个组件发请求  后面的id 是为了让你知道 点击的是哪一条评论的回复
      Bus.$emit("sendComment", this.commentData.id)
    }
  },

  mounted () {

  },
}
</script>

<style lang = "less" scoped>
#app {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .top {
    display: flex;
    .avator {
      width: 25px;
      height: 25px;
      object-fit: cover;
      margin-right: 5px;
      border: 1px solid #cccc;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      .nickname {
        font-size: 14px;
      }
      .create_date {
        margin-top: 3px;
        font-size: 12px;
        color: #ccc;
      }
    }
    .reply {
      color: #999;
      font-size: 13px;
    }
  }
  .content {
    margin-top: 5px;
    line-height: 1.4;
  }
}
</style>