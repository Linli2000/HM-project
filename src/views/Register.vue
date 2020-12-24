<template>
  <div class="container">
    <div class="btnClose">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputWrapper">
      <MyInput type="text" name="username" placeholder="请输入手机号" err_message="请输入5到11位的用户名" rule="[0-9A-Za-z_]{5,11}" @aa="aaHandel"></MyInput>
      <MyInput name="nickname" type="text" placeholder="昵称" err_message="你输入正确昵称" :rule="/^.{2,11}$/" @aa="aaHandel"></MyInput>
      <MyInput type="password" name="password" placeholder="密码" err_message="请输入6到18位的密码" rule="[0-9A-Za-z_]{5,11}" @aa="aaHandel"></MyInput>
    </div>
    <MyButton @bb='registerHandle'>注册</MyButton>
  </div>
</template>

<script>
// 引入字体图标
import style from '../style/iconfont.css'

// 引入input组件
import MyInput from '../components/MyInput.vue'
import MyButton from '../components/MyButton.vue'

// 导入封装的 "@/api/index.js" ，index.js 结尾可以简写成 "@/api" 即可。
import { userRegister } from "@/api";
// 引入自己封装好的后台接口
import { userLogin } from "../api/index.js";
export default {
  // 注册组件
  components: {
    MyInput, MyButton
  },
  data () {
    return {
      username: "",
      password: "",
      nickname: "",
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
    registerHandle () {
      if (!this.username || !this.password || !this.nickname) {
        // return 退出当前的事件处理函数，并且提示错误
        return this.$toast.fail("请输入完整信息");
      }
      // // 调用封装的注册用户的 api，向后端发请求注册用户
      // console.log('注册事件');
      userRegister({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      }).then((res) => {
        // console.log(res);
        // 错误的提示
        if (res.data.statusCode === 400) {
          this.$toast.fail(res.data.message);
        }
        // 成功的提示
        else {
          this.$toast.success("恭喜你，注册成功！");
        }
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
</style>