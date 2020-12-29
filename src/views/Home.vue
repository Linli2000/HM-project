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
      <van-tab title="标签 1">
        内容 6666666666
      </van-tab>
      <van-tab title="标签 2">
        <h1>大标题</h1>
      </van-tab>
      <van-tab title="标签 3">
        <h2>其他内容</h2>
      </van-tab>
      <van-tab title="标签 4">
        <h3>现成的很棒</h3>
      </van-tab>
      <van-tab title="标签 5">
        内容 6666666666
      </van-tab>
      <van-tab title="标签 6">
        <h1>大标题</h1>
      </van-tab>
      <van-tab title="标签 7">
        <h2>其他内容</h2>
      </van-tab>
      <van-tab title="标签 8">
        <h3>现成的很棒</h3>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0
    }
  },

  methods: {

  },

  mounted () {

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