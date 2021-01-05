<template>
  <div class="parent ">
    <Parent v-if="parentData.parent"
            :parentData="parentData.parent" />
    <!-- <h3>👨这是父评论{{parentData.content }}</h3> -->
    <div class="top">
      <span class="nickname">{{ parentData.user.nickname }}</span>
      <span class="create_date">{{ parentData.create_date.slice(0,10) }}</span>
      <span class="reply"
            @click="replyHandle">回复</span>
    </div>

    <div class="content">这是父评论:
      {{ parentData.content }}
    </div>
    <!-- 使用递归实现  在组件内部调用自己-->
  </div>
</template>

<script>
import Bus from '@/utils/Bus'
export default {
  // 组件内部调用需要用name注册 才能使用 固定写法
  name: 'Parent',
  props: ["parentData"],
  data () {
    return {

    }
  },

  methods: {
    replyHandle () {
      Bus.$emit("sendComment", this.parentData.id)
    }
  },

  mounted () {

  },
}
</script>

<style lang = "less" scoped>
.parent {
  border: 1px solid #aeaeab;
  padding: 3px;
  padding: 3px;
  background-color: #ffffee;
  .top {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .nickname {
      font-size: 14px;
    }

    .create_date {
      flex: 1;
      font-size: 12px;
      color: #ccc;
      margin-left: 10px;
    }

    .reply {
      font-size: 13px;
      color: #999;
    }
  }

  .content {
    padding: 0 10px;
    line-height: 1.4;
  }
}
</style>