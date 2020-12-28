<template>
  <div>
    <van-nav-bar title="我的关注"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 关注列表 -->
    <div class="list">
      <div class="list_item"
           v-for="item in list"
           :key="item.id">
        <img v-if="item.head_img"
             :src="$baseURL+item.head_img"
             alt="">
        <img v-else
             src="../assets/1.png"
             alt="">
        <div class="info">
          <p>{{item.nickname}}</p>
          <p class="date">{{ item.create_date.slice(0,10) }}</p>
        </div>
        <span class="cancel"
              @click="cancelHandle (item.id)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFollows, removeUserFollowsById } from '@/api';
export default {
  data () {
    return {
      list: [],
    }
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      getUserFollows().then((res) => {
        console.log(res);
        this.list = res.data.data
      })
    },
    // 获取关注列表的api

    cancelHandle (id) {
      // 根据 id 移除掉用户关注
      removeUserFollowsById(id).then((res) => {
        // console.log("取消用户关注接口", res);
        // 取消关注成功后，更新页面的列表
        this.getList();
      });
    },
  }
}
</script>

<style lang="less" scoped>
.list {
  .list_item {
    border: 1px solid #ddd;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 1px solid #ddd;
      // 可防止头像变形
      object-fit: cover;
    }

    .info {
      flex: 1;
      margin-left: 10px;
      p {
        margin: 5px 0;
      }

      .date {
        color: #999;
      }
    }

    .cancel {
      width: 70px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e9e9e9;
      border-radius: 15px;
      font-size: 12px;
    }
  }
}
</style>