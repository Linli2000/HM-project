<template>
  <!-- 个人中心-->
  <!-- 头部导航栏 -->
  <div>
    <van-nav-bar title="个人中心"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- $router.back()通过路由回退到上一步 因为路由是挂载到全局的 -->
    <!-- 一个小空格样式而已 -->
    <div class="divider"></div>
    <!-- 头部 -->
    <div class="header"
         @click="$router.push('/useredit')">
      <img class="avatar"
           v-if="head_img"
           :src='$baseURL+head_img'
           alt="" />
      <img class="avatar"
           v-else=" "
           :src='defaultImg'
           alt="" />
      <div class="info">
        <p class="name">
          <i class="iconfont"
             :class="{
              iconxingbienan: gender === 1,
              iconxingbienv: gender === 0  
          }"></i>
          <span>{{nickname}}</span>
        </p>
        <p class="date">{{create_date }}</p>
      </div>
      <i class="iconfont iconjiantou1"></i>
    </div>
    <!-- 使用Vant组件库的Cell组件 -->
    <div class="divider"></div>
    <van-cell-group>
      <van-cell title="我的关注"
                value="关注的人"
                is-link />
      <van-cell title="我的跟帖"
                value="跟帖/回复"
                is-link />
      <van-cell title="我的收藏"
                value="文章/收藏"
                is-link />
      <van-cell title="设置"
                is-link />
    </van-cell-group>
    <!-- 退出登录按钮 -->
    <van-button block
                type="default"
                @click="logOutHandle">退出登录</van-button>
  </div>
</template>


<script>
import { getUserInfo, removeToken, removeUserInfo } from '@/utils/myToken';
import { userDetail } from '@/api';
// 导入用户默认头像
import defaultImg from "@/assets/1.png";
export default {
  data () {
    return {
      gender: 0,
      // 只有写在data里面的才能被template接收  
      // 用户没有头像的时候才使用默认头像 先定义一个默头像然后进行判断 如果有就显示head_img拼接 没有就显示自己定义的defaultImg 
      defaultImg: defaultImg,
      head_img: '',
      nickname: "游客",
      create_date: ''
    }
  },
  methods: {
    // 退出按钮的处理
    logOutHandle () {
      //  清除token 和 本地存储的数据 
      removeToken()
      // 清除本地存储的用户信息
      removeUserInfo()

      this.$router.replace('/')
    },
  },
  mounted () {
    // console.log(this.$baseURL);
    //使用结构获取到id
    const { id } = getUserInfo();
    userDetail(id).then((res) => {
      // console.log(res);
      // 结构出当前需要的数据
      const { message, data } = res.data
      // 把后台拿到的数据渲染到页面中
      this.gender = data.gender;
      // 如果有头像就使用，如果是空字符串，就使用默认头像 现在的后台没有给图片 所以默认用我们的自己的图片
      this.head_img = data.head_img;
      this.nickname = data.nickname
      // 时间 通过slice截取 从0到第10位
      this.create_date = data.create_date.slice(0, 10);
    })
  }
};
</script>




<style lang="less" scoped>
.header {
  height: 130px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  .avatar {
    width: 70px;
    height: 70px;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info {
    flex: 1;
    font-size: 14px;
    p {
      margin: 5px 0;
    }
    .name {
      .iconxingbienan {
        color: #8502c2;
      }
      .iconxingbienv {
        color: skyblue;
      }

      span {
        margin-left: 5px;
        color: #333;
      }
    }

    .date {
      color: #999;
    }
  }

  .iconjiantou1 {
    color: #ccc;
    font-size: 25px;
  }
}
.divider {
  height: 10px;
  background-color: #f2f2f2;
}
</style>