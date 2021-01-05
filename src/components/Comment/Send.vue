<template>
  <div class="send">
    <!-- 用于发送评论的组件：分为两种情况 -->
    <!-- 情况1：输入框状态  输入框只能单行 显示状态下是输入框-->
    <div class="case_input"
         v-show="isShowTextarea">
      <input type="text"
             class="input"
             placeholder="请跟帖"
             @focus="showTextAreaHandle">
      <span class="icon_group">
        <i class="iconfont iconpinglun-"></i>
        <span class="icon_group_num">102</span>
      </span>
      <i class="iconfont iconshoucang"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>

    <!-- 情况2：文本域状态  文本域多行 用户真的输入需要文本域-->
    <div class="case_textarea"
         v-show="!isShowTextarea">
      <textarea class="textarea"
                placeholder="回复:"
                ref="textarea_dom"></textarea>
      <span class="send_btn">发送</span>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      // 输入框点击的显示和隐藏
      isShowTextarea: true
    }
  },

  methods: {
    // 显示文本域的事件
    showTextAreaHandle () {
      // 一开始输入框的值为true显示输入框  当点击之后值就为false 输入框就隐藏了 然后文本域取反 文本域的值就为true
      this.isShowTextarea = false;
      // 不能对影藏的袁术获取焦点 我们需要延迟 等他放出来之后在获取 更新我们看见的
      setTimeout(() => {
        this.$refs.textarea_dom.focus()
      }, 50)

    }
  },

  mounted () {

  },
}
</script>

<style lang = "less" scoped>
.send {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  .case_input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .input {
      width: 180px;
      height: 30px;
      border-radius: 15px;
      background-color: #d7d7d7;
      border: none;
      padding: 0 10px;
    }
    .iconfont {
      font-size: 25px;
    }
    .icon_group {
      position: relative;
      .icon_group_num {
        position: absolute;
        right: -10px;
        top: -5px;
        background-color: red;
        color: #fff;
        padding: 1px 3px;
        font-size: 12px;
        border-radius: 100px;
      }
    }
  }
}

/* // 情况2：文本域状态 */
.case_textarea {
  padding: 10px;
  display: flex;
  /* // 侧轴底部对齐  */
  align-items: flex-end;
  .textarea {
    flex: 1;
    height: 80px;
    border-radius: 5px;
    background-color: #d7d7d7;
    border: none;
    padding: 10px;
  }
  .send_btn {
    margin-left: 10px;
    width: 60px;
    height: 26px;
    background-color: red;
    border-radius: 13px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }
}
</style>