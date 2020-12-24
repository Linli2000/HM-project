<template>
  <div id="app">
    <div class="header">头部</div>
    <!-- 使用 Vant 组件库的 Cell 组件 -->
    <div class="divider"></div>
    <van-cell-group>
      <van-cell title="我的关注" value="关注的用户" is-link />
      <van-cell title="我的跟帖" value="跟帖/回复" is-link />
      <van-cell title="我的收藏" value="文章/收藏" is-link />
      <van-cell title="设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
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
.header {
  height: 120px;
  background-color: tan;
}
.divider {
  height: 10px;
  background-color: #f2f2f2;
}
</style>