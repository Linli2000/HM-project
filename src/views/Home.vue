<template>
  <div id="app">
    <h1>这是首页</h1>
    <router-link to="/login">
      <van-button type="primary">跳转到首页</van-button>
    </router-link>
    <router-link to="/register">
      <van-button type="primary">跳转到注册页</van-button>
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