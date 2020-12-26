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
      <!-- <van-uploader :after-read="afterRead">
        <img class="avatar_image"
        这种是实现文件预览 只能在前台看 跟下面的 this.head_img = content 对应 
             :src=" head_img"
             alt="">
      </van-uploader> -->
      <van-uploader :after-read="afterRead">
        <img class="avatar_image"
             :src="$baseURL+head_img"
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
import { userDetail, uploadFile, userUpdate } from '@/api'
export default {
  data () {
    return {
      nickname: '',
      head_img: '',
      gender: 0,
      id: 0
    }
  },

  methods: {
    // 文件读取成功的回调函数  里面有一个默认的参数 可以直接在里面解构
    afterRead ({ content, file }) {
      //  this.head_img = content; 可以用来展示图片 不过只能用来展示
      // 我们项目中如何实现修改图片功能
      // 1. 获取到用户上传的图片对象
      // 2. 把图片对象上传到服务器 要使用formdata这个功能
      // 3. 从服务的返回的数据中，获取到图片的相对路径
      // 4. 把最新的图片路径展示到模板中
      const fd = new FormData;
      // 把file追加到FormData里面
      fd.append('file', file)
      // 给后台发送请求 上传图片 保存到服务器
      uploadFile(fd).then((res) => {
        console.log(res);
        const head_img = res.data.data.url
        this.head_img = head_img

        // 更新用户头像数据 上面只是把文件上传到服务器= 并没有真的实现文件上传 因为刷新就会不在 相当于在下面编辑最后要传送到总接口
        userUpdate({
          id: this.id,
          head_img: head_img,
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$toast.success("更新头像成功");
          }
        })
      })

    },

    getCurrUserDetail () {
      const { id } = getUserInfo()
      this.id = id
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