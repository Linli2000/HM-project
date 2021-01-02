<template>
  <div @click="$router.push(`/detail/${postData.id}`)">
    <!-- 通过 v-else-if 可以让执行效率更高 -->
    <!-- 情况1：如果文章 `type === 1` 而且 封面`数量在一到二之间`, 显示`单图片`布局。 -->
    <div class="single"
         v-if="postData.type === 1 && postData.cover.length <= 2">
      <!-- -- 情况1：单张图片展示 -->
      <div class="info">
        <h3 class="title">{{postData.title}}</h3>
        <p class="bottom">
          <span>{{postData.user.nickname}}</span>
          <span>{{postData.comment_length}}跟帖</span>
        </p>
      </div>
      <img class="cover"
           :src="postData.cover[0].url"
           alt="">
    </div>
    <!-- 情况2：如果文章 `type === 1` 而且 封面`数量在三或以上`, 显示成`多图片`布局。 -->
    <div class="multiple"
         v-else-if="postData.type === 1 && postData.cover.length >=3">
      <!-- -------- 情况2：多张图片展示 - 只展示前3张 -->
      <h3 class="title">{{postData.title}}</h3>
      <div class="cover_group">
        <img class="cover"
             :src="postData.cover[0].url"
             alt="">
        <img class="cover"
             :src="postData.cover[1].url"
             alt="">
        <img class="cover"
             :src="postData.cover[2].url"
             alt="">
      </div>
      <p class="bottom">
        <span>{{postData.user.nickname}}</span>
        <span>{{postData.comment_length}}跟帖</span>
      </p>
    </div>
    <!-- 情况3：如果文章 `type === 2` 而且 封面`数量在一以上`，显示`视频`布局 -->
    <div class="video"
         v-else-if="postData.type === 2 && postData.cover.length >=1">
      <!-- ------------ 情况3：展示视频啦啦啦 -->
      <h3 class="title">{{postData.title}}</h3>
      <div class="video_group">
        <i class="iconfont iconshipin"></i>
        <img class="cover"
             :src="postData.cover[0].url"
             alt="">
      </div>
      <p class="bottom">
        <span>{{postData.user.nickname}}</span>
        <span>{{postData.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // 子组件需要接收：爸爸给你金鱼，你要用鱼缸接起来
  props: ["postData"],
};
</script>

<style lang="less" scoped>
// 2. 文章列表项
// 新闻项组件通用的类名
.title {
  font-size: 16px;
  font-weight: normal;
}
.bottom {
  font-size: 14px;
  span {
    color: #999;
    margin-right: 10px;
  }
}
// 情况1：单张图片展示
.single {
  display: flex;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;
  }
  .cover {
    width: 120px;
    height: 75px;
    object-fit: cover;
  }
}
// 情况2：多张图片展示 - 只展示前3张
.multiple {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  .cover_group {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .cover {
      width: 33%;
      height: 75px;
      object-fit: cover;
    }
  }
}
// 情况3：展示视频
.video {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  .video_group {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconshipin {
      position: absolute;
      color: #fff;
      font-size: 50px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
    .cover {
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
  }
}
</style>