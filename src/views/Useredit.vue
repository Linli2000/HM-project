<template>
  <div id="app">
    <!-- 1.0 导航栏 -->
    <van-nav-bar title="编辑资料"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 用户头像 -->
    <div class="avatar">
      <!-- <van-uploader>这个是vant 里面封装好的文件上传 -->
      <!-- :after-read文件读取完成之后的回调函数 -->
      <van-uploader :after-read="afterRead">
        <img class="avatar_image"
             :src=" head_img"
             alt="">
      </van-uploader>

    </div>
    <div class="divider"></div>
    <!-- 3.0 用户信息单元格 -->
    <van-cell-group>
      <van-cell title="昵称"
                :value="nickname"
                is-link />
      <van-cell title="密码"
                value="*****"
                is-link />
      <van-cell title="性别"
                :value="gender === 0 ? '🤷‍♀️女' : '👦男'"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/myToken'
import { userDetail } from '@/api'
export default {
  data () {
    return {
      nickname: '',
      head_img: '',
      gender: 0
    }
  },

  methods: {
    // 文件读取成功的回调函数  里面有一个默认的参数 可以直接在里面解构
    afterRead ({ content, file }) {
      //  this.head_img = content; 可以用来展示图片 不过只能用来展示
      this.head_img = content
    },

    getCurrUserDetail () {
      const { id } = getUserInfo()
      userDetail(id).then((res) => {
        console.log(res);
        const { nickname, head_img, gender } = res.data.data
        this.nickname = nickname
        this.head_img = head_img
        this.gender = gender
      })
    }
  },

  mounted () {
    this.getCurrUserDetail()
  },
}
</script>

<style lang = "less" scoped>
.avatar {
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar_image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
}
</style>