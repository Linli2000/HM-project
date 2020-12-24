<template>
  <input :class="{ success:state==='success' , error:state==='false' }" v-model="inputVal" @input="inputHandle" @change="checkVal">
</template>

<script>
export default {
  // 接收从父组件那边传过来的属性 自定义的属性就要 标签自带的属性就可以直接不用写
  props: ['rule', 'err_message'],
  data () {
    return {
      inputVal: '',
      state: ''
    }
  },
  watch: {
    inputVal (val) {
      // console.log(val);
      // 把字符串转成正则规则对象
      const reg = new RegExp(this.rule)
      // 判断输入框输入的val值 是不是符合字符串规则的
      // test() 方法用于检测一个字符串是否匹配某个模式.
      if (!reg.test(val)) {
        // console.log('错误');
        this.state = 'false'
      } else {
        this.state = 'success'
      }
    }
  },
  methods: {
    inputHandle () {
      // console.log(this.inputVal);
      // console.log('子组件被触发了');
      // console.log("this.$attrs.name", this.$attrs.name);
      this.$emit('aa', { [this.$attrs.name]: this.inputVal })
    },
    checkVal () {
      if (this.state == 'false') {
        this.$toast.fail(this.err_message);
      }
    }
  }
}
</script>

<style lang = "less" scoped>
input {
  width: 100%;
  height: 48/360 * 100vw;
  line-height: 48/360 * 100vw;
  font-size: 18/360 * 100vw;
  border: none;
  outline: none;
  border-bottom: 1px solid #333;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>