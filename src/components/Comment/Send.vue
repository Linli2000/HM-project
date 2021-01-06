<template>
  <div class="send">
    <!-- 用于发送评论的组件：分为两种情况 -->
    <!-- 情况1：输入框状态  输入框只能单行 显示状态下是输入框-->
    <div class="case_input"
         v-show="isShowTextarea">
      <input type="text"
             class="input"
             placeholder="请跟帖"
             :value="content"
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
                ref="textarea_dom"
                v-model="content"
                @blur="hideTextAreaHandle"></textarea>
      <span class="send_btn"
            @click="sendCommentHandle">发送</span>
    </div>

  </div>

</template>

<script>
import { addPostComment } from '@/api';
// 导入事件总线
import Bus from "@/utils/Bus"
export default {
  // 接收父组件传递过来的文章 id
  props: ["detailId"],
  data () {
    return {
      // 输入框点击的显示和隐藏
      isShowTextarea: true,

      // 文本域的评论内容
      content: "",

      // 前面传递获取到的id
      parent_id: "",
    }
  },

  methods: {
    // 显示文本域的事件
    showTextAreaHandle () {
      // 一开始输入框的值为true显示输入框  当点击之后值就为false 输入框就隐藏了 然后文本域取反 文本域的值就为true
      this.isShowTextarea = false;
      // 数据发生变化, 到页面正式更新是有一个间距
      // 不能对影藏的元素获取焦点  数据更新了但是由于元素的隐藏的 不能对隐藏元素获取焦点  所以我们需要等他显示后 延迟 等上面元素出来之后多少m之后在获取 更新我们看见的
      // setTimeout(() => {
      //   this.$refs.textarea_dom.focus()
      // }, 5000)
      // 将传入的回调函数延迟到下次 DOM (DOM是操作元素的属性和值  DOM元素的一写就运行了) 新循环之后执行。 
      // 在执行点击显示文本框之后 再执行这个this.$refs.textarea_dom.focus()
      this.$nextTick(() => {
        // 文本域显示之后才能获取焦点  不能对隐藏的元素进行dom炒作
        this.$refs.textarea_dom.focus()
      })
    },
    // 隐藏文本域
    hideTextAreaHandle () {
      setTimeout(() => {
        this.isShowTextarea = true;
        this.parent_id = "";
      }, 50);
    },
    // 点击发送按钮 - 发送评论
    // BUG：点击按钮之前，其实先触发了 文本域的失去焦点事件，按钮就被隐藏起来了，点不到了
    sendCommentHandle () {
      // console.log("你点击了发送评论按钮");
      // 调用api
      // 调用 api 中封装的添加评论接口
      addPostComment({
        // 文章id：注意需要通过父传子传递过来`1
        id: this.detailId,
        // 评论内容：从文本域中获取
        content: this.content,
        // 回复的哪一条id
        parent_id: this.parent_id
      }).then((res) => {
        // console.log(res);
        // 发送评论成功，给用户一个轻提示
        this.$toast(res.data.message);
        // 体验优化：回复成功后，清空文本域内容
        this.content = "";

        // 向父组件发送事件 重新获取评论列表
        this.$emit("updataComment")
      });
    },
  },

  mounted () {
    // 发布组件加载时 就绑定前面发送的  事件sendComment 数据 id
    Bus.$on("sendComment", (id) => {
      console.log(id);
      // 把获取到的id 存储起来 后台接口需要
      this.parent_id = id
      //  就显示文本框
      this.showTextAreaHandle()
    })
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