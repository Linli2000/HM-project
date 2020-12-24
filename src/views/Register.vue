<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <!-- 4. 使用组件  -->
    <MyInput name="username" type="text" placeholder="用户名/手机号码" err_message="请输入5到11位的用户名" :rule="/^[0-9A-Za-z_]{5,11}$/" @aa="aaHandle" />
    <!-- 
      解读正则表达式：[0-9A-Za-z_~!@#$%^&*()_+.]  
      解读结果：一共分 3 部分
        1. 所有数字 0-9
        2. 所有字母 A-Za-Z
        3. 允许密码使用的特殊符号 _~!@#$%^&*()_+. 
    -->
    <MyInput name="password" type="password" placeholder="密码" err_message="请输入6到18位的密码" :rule="/^[0-9A-Za-z_~!@#$%^&*()_+.]{6,18}$/" @aa="aaHandle" />
    <!-- @bb 表示父组件上的自定义事件，触发自定义事件的时候执行 loginHandle 函数实现登录 -->
    <MyButton @bb="loginHandle">登录</MyButton>
  </div>
</template>

<script>
// 1. 创建组件 vue 文件
// 2. 导入组件
import MyInput from "@/components/MyInput.vue";
import MyButton from "@/components/MyButton.vue";
// 导入封装的 "@/api/index.js" ，index.js 结尾可以简写成 "@/api" 即可。
import { userLogin } from "@/api";
export default {
  // 3. 注册组件
  components: {
    MyInput,
    MyButton,
  },
  data () {
    return {
      username: "13535333333",
      password: "123456",
    };
  },
  methods: {
    // 数据子传父，获取子组件传递回来的数据
    aaHandle (obj) {
      // console.log(obj);
      // // 获取对象的所有键名称，从数组从中提取第一项
      const key = Object.keys(obj)[0];
      // // 获取对象的所有值，从数组从中提取第一项
      const value = Object.values(obj)[0];
      // [] 可以传入变量作为 this 的属性
      // this.username = xxx    只不过这里的 username 变成了变量 key
      this[key] = value;
    },
    // 登录事件处理函数
    loginHandle () {
      // console.log("你触发了父组件的函数");
      if (!this.username || !this.password) {
        // 失败轻提示
        return this.$toast.fail("用户名或密码不能为空");
      }
      // 调用封装的登录接口函数，并且传递请求参数
      userLogin({
        username: this.username,
        password: this.password,
      }).then((res) => {
        // console.log(res);
        // alert(res.data.message);
        if (res.data.message === "登录成功") {
          console.log("需要把token保存到本地");
        } else {
          // 纯文本提示
          this.$toast(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  // vw代码片段 /540*100vw，选中所有的px单位换成vw单位(选择相同词用快捷键 Ctrl+D)
  padding: 0 40/540 * 100vw;
  padding-top: 100/540 * 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.close {
  position: absolute;
  left: 20/540 * 100vw;
  top: 20/540 * 100vw;
  .iconicon-test {
    font-size: 30/540 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;
  .iconnew {
    color: #d81e06;
    font-size: 160/540 * 100vw;
  }
}
</style>