<template>
  <div id="app">
    <!-- 1.0 首页头部 -->
    <div class="header">
      <!-- 1.1 左边 logo 图标 -->
      <span class="iconfont iconnew"></span>
      <!-- 1.2 中间搜索框 -->
      <div class="search"
           @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <!-- 1.3 右侧 个人中心图标 -->
      <span class="iconfont iconwode"
            @click="$router.push('/userinfo')"></span>
    </div>

    <!-- 2.0 tabs 分类切换 -->
    <van-tabs v-model="activeIndex">
      <van-tab v-for="item in cateList "
               :key="item.id"
               :title="item.name">
        内容 6666666666
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getCategory, getPostList } from '@/api';
export default {
  data () {
    return {
      activeIndex: 0,
      // tab栏的列表数据
      cateList: [],
      // 新闻列表的数据
      postList: []
    }
  },

  methods: {
    // 以后会用到多次 所以封装起来 方便后期使用
    getPostListData () {
      getPostList({
        category: 999,
        pageSize: 10,
        pageIndex: 1
      }).then((res) => {
        // console.log(res);
        this.postList = res.data.data
      })
    }
  },
  //每次页面加载就执行 mounted   用created也可以
  mounted () {
    // 获取头部下面的导航栏
    getCategory().then((res) => {
      // console.log(res);
      this.cateList = res.data.data
    })
    // getPostListData 获取新闻列表
    this.getPostListData();
  },

}
</script>

<style lang = "less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: red;
  color: #fff;
  padding: 0 15px;
  .iconnew {
    font-size: 45px;
  }

  .search {
    flex: 1;
    height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    // 只需要大于等于盒子高度的一般，就是这个胶囊型圆角盒子
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    .iconsearch {
      margin-right: 3px;
    }

    span {
      font-size: 12px;
    }
  }

  .iconwode {
    font-size: 25px;
  }
}
</style>