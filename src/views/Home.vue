<template>
  <div id="app">
    <h1>这是首页</h1>
    <router-link to="/login">
      <van-button type="primary">登录页</van-button>
    </router-link>
    <router-link to="/register">
      <van-button type="primary">注册页</van-button>
    </router-link>
    <router-link to="/Userinfo">
      <van-button type="primary">个人中心页</van-button>
    </router-link>
    <router-link to="/useredit">
      <van-button type="primary">编辑资料</van-button>
    </router-link>
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
</style>