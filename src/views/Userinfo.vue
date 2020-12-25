<template>
  <!-- 个人中心
   -->
  <div>
    <!-- 头部 -->
    <div class="header">
      <img class="avatar"
           :src='head_img'
           alt="" />
      <div class="info">
        <p class="name">
          <i class="iconfont iconxingbienv"></i>
          <span>{{nickname}}</span>
        </p>
        <p class="date">2020-12-25</p>
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
  </div>
</template>


<script>
import { getUserInfo } from '@/utils/myToken';
import { userDetail } from '@/api';
// 导入用户默认头像
import defaultImg from "@/assets/1.png";
export default {
  data () {
    return {
      gender: 0,
      head_img: defaultImg,
      nickname: "游客",
    }
  },
  mounted () {
    //使用结构获取到id
    const { id } = getUserInfo();
    userDetail(id).then((res) => {
      console.log(res);
      // 结构出当前需要的数据
      const { message, data } = res.data
      // 把后台拿到的数据渲染到页面中
      this.gender = data.gender;
      // 如果有头像就使用，如果是空字符串，就使用默认头像
      this.head_img = data.head_img || defaultImg;
      this.nickname = data.nickname
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
      .iconxingbienv {
        color: #8502c2;
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