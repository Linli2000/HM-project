<template>
  <div>
    <van-nav-bar title="我的关注"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 关注列表 -->
    <div class="list">
      <div class="list_item">
        <img src="@/assets/logo.png"
             alt="">
        <div class="info">
          <p>火星新闻播报</p>
          <p class="date">2020-12-12</p>
        </div>
        <span class="cancel">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.list {
  .list_item {
    border: 1px solid #ddd;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 1px solid #ddd;
      // 可防止头像变形
      object-fit: cover;
    }

    .info {
      flex: 1;
      margin-left: 10px;
      p {
        margin: 5px 0;
      }

      .date {
        color: #999;
      }
    }

    .cancel {
      width: 70px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e9e9e9;
      border-radius: 15px;
      font-size: 12px;
    }
  }
}
</style>