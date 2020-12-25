<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputWrapper">
      <MyInput type="text"
               name="username"
               placeholder="请输入手机号"
               err_message="请输入5到11位的用户名"
               rule="[0-9A-Za-z_]{5,11}"
               @aa="aaHandel"></MyInput>
      <MyInput type="password"
               name="password"
               placeholder="密码"
               err_message="请输入6到18位的密码"
               rule="[0-9A-Za-z_]{5,11}"
               @aa="aaHandel"></MyInput>
    </div>
    <MyButton @bb="loginHandle">登录按钮</MyButton>
  </div>
</template>

<script>
// 引入字体图标
import style from '../style/iconfont.css'

// 引入input组件
import MyInput from '../components/MyInput.vue'
import MyButton from '@/components/MyButton.vue'

// 引入自己封装好的后台接口
import { userLogin } from '@/api/index.js'
export default {
  // 注册组件
  components: {
    MyInput,
    MyButton,
  },
  data () {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    // 子组件传递的参数
    aaHandel (obj) {
      // console.log(obj);
      // 拿到输入框的件
      const key = Object.keys(obj)[0]
      const value = Object.values(obj)[0]
      this[key] = value
      // console.log(key, value);
    },
    // 登录事件处理函数
    loginHandle () {
      // console.log('aaa');
      if (!this.username || !this.password) {
        return this.$toast('用户名或密码不能为空')
      }
      // console.log(userLogin);
      // 准备发送请求所需的参数
      const data = { username: this.username, password: this.password }
      // 调用封装的登录接口函数，并且传递请求参数
      userLogin(data).then((res) => {
        // console.log(res);
        if (res.data.message === '登录成功') {
          // console.log('把token保存到本地')
          // console.log(res.data.data.token); 拿到token值
          // localStorage.setItem('TOKEN_HMTT', res.data.data.token)
          
          //登录成功 给用户一个成功的提示
          this.$toast.success('欢迎入坑')
        } else {
          this.$toast.fail(res.data.message)
        }
      })
    },
  },
}
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
</style>