<template>
  <div>
    <!-- 1.0 导航栏 -->
    <van-nav-bar title="我的跟帖"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 评论列表 -->
    <div class="list">
      <!-- 列表渲染 -->
      <div class="item"
           v-for="item in list"
           :key="item.id">
        <!-- 2.1 日期部分 -->
        <div class="date">
          <span>{{ item.create_date.split('T')[0] }}</span>
          <span>{{ item.create_date.split('T')[1].slice(0,5) }}</span>
        </div>
        <!-- 2.2 评论内容部分 -->
        <div class="content">
          {{ item.content }}
        </div>
        <!-- 2.3 文章链接部分 -->
        <div class="detail"
             @click="$router.push(`/detail/${item.post.id}`)">
          <p>{{ item.post.title }}</p>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserComment } from "@/api";
export default {
  data () {
    return {
      list: [],
    };
  },
  created () {
    getUserComment().then((res) => {
      // console.log(res.data);
      this.list = res.data.data;
    });
  },
};  
</script>

<style lang="less" scoped>
.list {
  .item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    .date {
      font-size: 14px;
      color: #888;
      span {
        margin-right: 5px;
      }
    }

    .content {
      padding: 16px;
      color: #333;
      padding: 10px;
    }

    .detail {
      font-size: 12px;
      color: #888;
      display: flex;
      align-items: center;
      height: 30px;
      p {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>