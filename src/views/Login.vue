<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputWrapper">
      <MyInput type="text" placeholder="请输入手机号" rule="[0-9A-Za-z_]{5,11}" @aa="aaHandel"></MyInput>
      <MyInput type="password" placeholder="密码" rule="[0-9A-Za-z_]{5,11}" @aa="aaHandel"></MyInput>
    </div>

    <div class="btnSubmit" @click="loginHandle">
      <button>登录</button>
    </div>

  </div>
</template>

<script>
// 引入字体图标
import style from '../style/iconfont.css'

// 引入input组件
import MyInput from '../components/MyInput.vue'

// 引入自己封装好的后台接口
import { userLogin } from "../api/index.js";
export default {
  // 注册组件
  components: {
    MyInput
  },
  data () {
    return {
      text: "",
      password: ""
    }
  },

  methods: {
    // 子组件传递的参数
    aaHandel (obj) {
      // console.log(val);
      // this.text = val
      if (obj.text) {
        this.text = obj.text
      } else if (obj.password) {
        this.password = obj.password
      }
      // console.log(this.text);
    },
    // 登录事件处理函数
    loginHandle () {
      console.log('aaa');
      // console.log(userLogin);
      // 准备发送请求所需的参数
      const data = { username: 10086, password: 111 };
      // 调用封装的登录接口函数，并且传递请求参数
      userLogin(data).then((res) => {
        console.log(res);
      });
    },
  },
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