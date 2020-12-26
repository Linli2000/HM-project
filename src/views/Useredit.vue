<template>
  <div id="app">
    <!-- 1.0 导航栏 -->
    <van-nav-bar title="编辑资料"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 用户头像 -->
    <div class="avatar">
      <img class="avatar_image"
           src=""
           alt="">
    </div>
    <div class="divider"></div>
    <!-- 3.0 用户信息单元格 -->
    <van-cell-group>
      <van-cell title="昵称"
                value="火星网友"
                is-link />
      <van-cell title="密码"
                value="*****"
                is-link />
      <van-cell title="性别"
                value="男"
                is-link />
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
avatar {
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar_image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
}
</style>