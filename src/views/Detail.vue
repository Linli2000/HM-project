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
        用三元表达式进行判断
  -->
      <div class="follow_btn"
           :class="detail.has_follow ? 'active' : ''"
           @click="followHandle">
        {{ detail.has_follow ? '已关注' : '关注' }}
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
      <!-- 视频 -->
      <video class="video_main"
             controls
             :poster="detail.cover[0].url"
             src="https://video.pearvideo.com/mp4/adshort/20201231/cont-1714376-15555367_adpkg-ad_hd.mp4"></video>

      <!-- 下面的文章 -->
      <div class="author">
        <div class="author_info">
          <img v-if="detail.user.head_img"
               :src="$baseURL + detail.user.head_img"
               alt=""
               class="author_avator">
          <img v-else
               src="@/assets/1.png"
               alt=""
               class="author_avator">
          <span class="author_name">{{ detail.user.nickname }}</span>
        </div>
        <div class="follow_btn"
             :class="detail.has_follow ? 'active' : ''"
             @click="followHandle">
          {{ detail.has_follow ? '已关注' : '关注' }}
        </div>
      </div>
      <h1 class="video_title">{{ detail.title }}</h1>
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

    <!-- 用于分隔模块的类名 -->
    <div class="divider"></div>
    <!-- 4.0 文章跟帖 -->
    <!-- 4.0 文章跟帖 -->
    <div class="comment">
      <h2 class="comment_title">精彩跟帖</h2>

      <!-- 因为有两种情况 有一种是没有评论的 就不需要展示 可以提醒用户没有评论  -->
      <!-- 情况1 如果有长度就可以显示内容 -->
      <div class="comment_list"
           v-if="commentList.length>0">
        <!-- 使用父评论组件，v-for 渲染评论列表，组件内部自动渲染父评论 -->
        <CommentMain v-for="item in commentList"
                     :key="item.id"
                     :commentData="item" />
        <!--  如果有东西 就截取3条 然后展示页面底部的更多跟帖 -->
        <span class="comment_more"
              @click="$router.push(`/comment/${detailId}`)">更多跟帖</span>
      </div>
      <!-- 情况2 没有数据 就提示这没有 显示为空 -->
      <div v-else
           class="comment_empty">
        暂无跟帖 让我看看谁是第一个🧐
      </div>

      <!-- 5.0 底部的评论回复组件 -->
      <CommentSend @updataComment="getPostCommentData"
                   :detailId="detailId" />

    </div>
    <!-- 如果没有登录就跳出模态框 -->
    <!-- Vant 的模态框 -->
    <van-dialog v-model="loginShow"
                title="亲，你没有登录"
                cancel-button-text="残忍拒绝"
                confirm-button-text="去登录"
                @confirm="goToLogin"
                show-cancel-button>
    </van-dialog>
  </div>
</template>

<script>
import { addUserFollowsById, getPostById, getPostCommentById, removeUserFollowsById, updatePostLikeById } from '@/api';
import { getToken } from '@/utils/myToken';
import CommentMain from "@/components/Comment/Main.vue";
import CommentSend from "@/components/Comment/Send.vue";
export default {
  components: {
    // 注册父评论组件
    CommentMain,
    // 注册底部自己写评论的组件
    CommentSend
  },
  data () {
    return {
      detail: [],
      isLogin: false,
      loginShow: false,
      commentList: [],
      detailId: 0
    }
  },

  methods: {

    //  关注和未关注
    followHandle () {
      // 判断用户是否登录 如果有登录就进行下面代码的执行 没有就弹出模态框去login登录
      if (this.isLogin === false) {
        this.loginShow = true
        return;
      }
      // 实现关注和取消功能
      // 先拿到user的id 后台接口需要 关注和取消是两个接口
      const userId = this.detail.user.id;

      if (this.detail.has_follow === true) {
        //  如果关注了就取消关注
        removeUserFollowsById(userId).then((res) => {
          // console.log(res);
          this.$toast(res.data.message)
          this.detail.has_follow = false
        })
      } else {
        addUserFollowsById(userId).then((res) => {
          this.$toast(res.data.message)
          this.detail.has_follow = true
        })
      }
    },
    // 点赞
    postLikeHandle () {
      // 判断是否已经登录 如果没有登录 就跳出模态框
      if (this.isLogin === false) {
        this.loginShow = true
        // return 结束下面代码的执行 免得发送错误请求 因为一般情况下 没有登录就可以不用执行下面点赞的代码 也不要向后台发送请求  
        return;
      }
      // console.log(11);
      // 已经登录 状态的点赞
      // 发送点赞请求 用于更新数据
      updatePostLikeById(this.detailId).then((res) => {
        console.log(res);
        const { message } = res.data
        // 判断message的状态 看取消点赞的成功点赞的两个状态 更新页面可以看见的点赞个数
        // 可以根据点赞状态(has_like)去改变 上面的样式 如果has_like 这个属性为true 就可以添加active这个我们自己写的样式  为false 就为空 不添加样式  上面用三眼表达式写的
        if (message === '点赞成功') {
          this.detail.like_length += 1
          this.detail.has_like = true
        } else {
          this.detail.like_length -= 1
          this.detail.has_like = false
        }
      })
    },
    // 模态框的跳转

    // 点击了确认，跳转去登录页
    goToLogin () {
      // 注意：原本的登录页，在登录成功后都是返回了个人中心，现在要完善登录成功后，返回原本的页面
      // this.$router.push("/login");
      this.$router.push({
        // 固定用法，需要通过 name 指定登录页组件
        name: "Login",
        // 在跳转到登录页的时候，同时把当前页面的路径传递过去 
        //  到前面login页面进行判断  如果有target值就跳到值里面的页面 如果没有就到登录页面
        params: { target: this.$route.path },
      });
    },

    // 封装获取评论列表
    getPostCommentData () {
      // 获取评论列表
      getPostCommentById(this.detailId).then((res) => {
        console.log("getPostCommentById", res.data);
        // slice 截取后台数据 我们现在只要3条 避免页面过长 如果需要可以点击下面的精彩跟帖跳转再加载
        this.commentList = res.data.data.slice(0, 3);
      });
    }
  },

  mounted () {
    // 页面一加载就获取本地存储里面有没有token  判断用户有没有登录
    this.isLogin = getToken() ? true : false
    // 通过路由传参 传过来的id
    const { id } = this.$route.params
    this.detailId = id
    getPostById(id).then((res) => {
      // console.log(res);
      this.detail = res.data.data;
    });
    this.getPostCommentData();
  },
}
</script>


<style lang="less" scoped>
.comment {
  padding-bottom: 120px;
  background-color: #f8fcff;
}
.comment_title {
  font-size: 16px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment_list {
  padding-bottom: 50px;
  .comment_more {
    width: 120px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 0;
    font-size: 13px;
  }
}
// 空列表
.comment_empty {
  font-size: 13px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 视频的布局
.video {
  .video_title {
    font-size: 16px;
    padding: 0 15px;
    font-weight: normal;
  }
  .video_main {
    width: 100%;
    // 最大高度
    max-height: 500px;
  }

  .author {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .author_info {
      display: flex;
      align-items: center;
      .author_avator {
        width: 25px;
        height: 25px;
        object-fit: cover;
        border: 1px solid #ddd;
        border-radius: 50%;
      }

      .author_name {
        margin-left: 5px;
        font-size: 13px;
        color: #666;
      }
    }
  }
}
// 按钮组
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
// 关注按钮到时候复用起来，所以样式定义到外面
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
      color: #ff0000;
    }
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

  // 🚩 /deep/ 深度修改，可以用于修改没有 data-v-xxx 元素的样式
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
</style>