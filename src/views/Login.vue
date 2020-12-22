<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputWrapper">
      <MyInput type="text" placeholder="请输入手机号" rule="/^[0-9A-Za-z_]{5,11}$/"></MyInput>
      <MyInput type="password" placeholder="密码"></MyInput>
    </div>

    <div class="btnSubmit">
      <button>登录</button>
    </div>

  </div>
</template>

<script>
// 引入字体图标
import style from '../style/iconfont.css'

// 引入input组件
import MyInput from '../components/MyInput.vue'
export default {

  // 注册组件
  components: {
    MyInput
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 24/360 * 100vw;
}
.btnClose {
  .iconfont {
    font-size: 28/360 * 100vw;
  }
}
.logo {
  text-align: center;
  .iconfont {
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}
.inputWrapper {
  padding-bottom: 16/360 * 100vw;
}
.btnSubmit {
  padding-top: 26/360 * 100vw;
  button {
    width: 100%;
    // height: 48/360*100vw;
    line-height: 48/360 * 100vw;
    font-size: 18px;
    background: #cc3300;
    color: white;
    border: none;
    outline: none;
    border-radius: 24/360 * 100vw;
  }
}
</style>