<template>
  <button @click="loginHandle" class="submit">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    loginHandle () {
      // console.log('点击了');
      this.$emit('bb')
    }
  }
}
</script>

<style lang = "less" scoped>
.submit {
  background-color: #cc3300;
  color: #fff;
  border: none;
  outline: none;
  width: 480/540 * 100vw;
  height: 65/540 * 100vw;
  display: block;
  border-radius: 100/540 * 100vw;
  margin-top: 60/540 * 100vw;
  font-size: 20/540 * 100vw;
}
</style>