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
        <img v-if="head_img"
             class="avatar_image"
             :src="$baseURL+head_img"
             alt="">
        <img v-else
             class="avatar_image"
             src="@/assets/1.png"
             alt="">
      </van-uploader>
    </div>
    <div class="divider"></div>
    <!-- 3.0 用户信息单元格 -->
    <van-cell-group>
      <van-cell title="昵称"
                :value="nickname"
                @click="nickNameShow=true"
                is-link />
      <van-cell title="密码"
                value="*****"
                @click="passwordShow=true"
                is-link />
      <van-cell title="性别"
                :value="gender === 0 ? '🤷‍♀️女' : '👦男'"
                @click="genderShow=true"
                is-link />
    </van-cell-group>

    <!-- 随便找个位置即可，因为最终是通过定位的方式显示到页面中 -->
    <!-- 1.0 为修改昵称准备一个弹窗 -->
    <van-dialog v-model="
                nickNameShow"
                title="修改昵称"
                show-cancel-button
                @confirm="upDateInfoHandle('nickname',nicknameTemp)">
      <van-field v-model="nicknameTemp"
                 label="昵称"
                 placeholder="请输入新昵称" />
    </van-dialog>

    <!-- type="password" 变成密码框 -->
    <van-dialog v-model="passwordShow"
                title="修改密码"
                show-cancel-button
                @confirm="upDateInfoHandle('password',passwordTemp)">
      <van-field v-model="passwordTemp"
                 label="密码"
                 type="password"
                 placeholder="请输入新密码" />
    </van-dialog>

    <!-- 更改性别的 -->
    <van-action-sheet v-model="genderShow"
                      :actions="genderActions"
                      @select="genderSelectHandle"
                      close-on-click-action
                      cancel-text="取消" />

    <div class="divider"></div>

  </div>
</template>

<script>
import { getUserInfo } from '@/utils/myToken'
import { userDetail, uploadFile, userUpdate } from '@/api'
export default {
  data () {
    return {
      nickNameShow: false,
      passwordShow: false,
      genderShow: false,
      // 临时保存输入值的地方 用户点击确定发送后台以后才会有真的值
      nicknameTemp: "",
      passwordTemp: '',
      // name 属性用于展示 文档规定写name，gender 属性用于后台需要的数据
      genderActions: [{ name: '男孩纸', gender: 1 }, { name: '女孩纸', gender: 0 }],
      nickname: '',
      head_img: '',
      gender: 0,
      id: 0
    }
  },

  methods: {

    // 性别选项下拉
    genderSelectHandle ({ gender }) {
      // console.log('aaa');
      this.upDateInfoHandle('gender', gender)
    },
    // 封装的密码和用户名更改
    upDateInfoHandle (key, value) {
      userUpdate({
        id: this.id,
        // 这里的参数不能写死，需同时实现更新 昵称 和 密码 s上面点击传下来的属性和名就可以直接使用
        [key]: value
      }).then((res) => {
        // 重新获取用户资料 因为更新了 上面已经把更改的上传到服务器了
        this.getCurrUserDetail();
        this.$toast.success(res.data.message);
      })
    },

    // 文件读取成功的回调函数里面有一个默认的参数 可以直接在里面解构
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

        // 更新用户头像数据 上面只是把文件上传到服务器 并没有真的实现文件上传 因为刷新就会不在 相当于在下面编辑最后要传送到总接口
        userUpdate({
          id: this.id,
          head_img: head_img,
        }).then((res) => {
          // console.log(res);
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