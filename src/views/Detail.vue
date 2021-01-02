<template>
  <div id="app">
    <div class="header">
      <div class="header_back"
           @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
        <span class="iconfont iconnew"></span>
      </div>
      <!-- 关注按钮
        1. 用户没有关注的情况下，文字提示为：关注，红色的
        2. 已经关注的情况下，文字提示为：已关注，白色的
      -->
      <div class="follow_btn">
        关注
      </div>
    </div>
    <!-- Detail组件接收到的参数： 路由传参{{ $route.params.id }} -->
    <div v-if="detail.type === 1"
         class="news">
      <h1 class="title">{{ detail.title }}</h1>
      <div class="author">
        <span class="author_name">{{ detail.user.nickname }}</span>
        <span class="author_date">{{ detail.create_date.slice(0,10) }}</span>
      </div>
      <!-- 字符串渲染成 html 结构用 v-html -->
      <div class="content"
           v-html="detail.content"></div>
    </div>
    <!-- 情况2：type===2 的时候渲染视频详情 -->
    <div v-else-if="detail.type === 2"
         class="video">
      <h1> 情况2：type===2 的时候渲染视频详情</h1>
    </div>

    <div class="btn_group">
      <div class="btn_like "
           :class="detail.has_like ? 'active' : ''"
           @click="postLikeHandle">
        <i class="iconfont icondianzan"></i>
        <span>{{ detail.like_length }}</span>
      </div>
      <div class="btn_weixin">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById, updatePostLikeById } from '@/api';
export default {
  data () {
    return {
      detail: {}
    }
  },

  methods: {
    postLikeHandle () {
      // console.log(11);
      // 已经登录 状态的点赞
      // 发送请求 用于更新数据
      updatePostLikeById(this.detailId).then((res) => {
        // console.log('点赞的', res);
        const { message } = res.data
        // 判断message的状态 看取消点赞的成功点赞的两个状态 更新页面可以看见的点赞个数
        // 可以根据点赞状态(has_like)去改变 上面的样式 如果has_like 这个属性为true 就可以添加active这个我们自己写的样式  为false 就为空 上面用三眼表达式写的
        if (message === '点赞成功') {
          this.detail.like_length += 1
          this.detail.has_like = true
        } else {
          this.detail.like_length -= 1
          this.detail.has_like = false
        }
      })
    }
  },

  mounted () {
    // 通过路由传参 传过来的id
    const { id } = this.$route.params
    this.detailId = id
    getPostById(id).then((res) => {
      // console.log(res);
      this.detail = res.data.data;
    });
  },
}
</script>

<style lang = "less" scoped>
/* / 按钮组 */
.btn_group {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  .btn_like,
  .btn_weixin {
    width: 80px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 点赞按钮的选中状态
  .btn_like.active {
    color: #ff7a00;
    border-color: #ff7a00;
  }
  .iconfont {
    margin-right: 3px;
  }
  .iconweixin {
    color: #00c800;
  }
}
/* // 关注按钮到时候复用起来，所以样式定义到外面 */
.follow_btn {
  width: 62px;
  height: 26px;
  border-radius: 13px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  // 默认状态是红色的按钮
  background-color: red;
  border: 1px solid red;
  color: #fff;
  // 如果已经关注的话，就是白色按钮
  &.active {
    background-color: transparent;
    border-color: #ddd;
    color: #333;
  }
}
.news {
  padding: 10px;
  .title {
    font-size: 18px;
  }

  .author {
    margin: 5px 0;
    font-size: 12px;
    color: #999;
    .author_name {
      margin-right: 10px;
    }
  }

  /* // 🚩 /deep/ 深度修改，可以用于修改没有 data-v-xxx 元素的样式 */
  /* PS: 如果用 Sass 处理器深度修改样式用 >>> */
  /deep/ .content {
    .photo {
      // 图片下方的文字说明
      span {
        display: flex;
        justify-content: center;
        color: #666;
        font-size: 12px;
        margin: 3px 0;
      }
    }
    img {
      width: 100%;
    }
    p {
      text-indent: 2em;
      // 上下 margin 会自动合并，段落间的排列更好看
      margin: 10px 0;
      // 行高其实是用于掉多行文字的间距
      line-height: 1.5;
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
  .header_back {
    display: flex;
    align-items: center;
    .iconjiantou2 {
      font-size: 20px;
    }

    .iconnew {
      font-size: 45px;
    }
  }
}
</style>