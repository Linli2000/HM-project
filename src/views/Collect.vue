<template>
  <div id="app">
    <!-- 上面的返回框框 -->
    <van-nav-bar title="我的收藏"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!--  复用前面新闻列表里面的 PostItem 组件 -->
    <PostItem v-for="item in list"
              :key="item.id"
              :postData="item" />
  </div>
</template>

<script>
import { getStarList } from "@/api";
// 导入组件
import PostItem from "@/components/PostItem.vue";
export default {
  // 注册组件
  components: {
    PostItem,
  },
  data () {
    return {
      list: [],
    }
  },

  methods: {

  },

  mounted () {
    getStarList().then((res) => {
      console.log(res);
      // 存储数据
      this.list = res.data.data.map((item) => {
        return {
          // 展开对象 免得覆盖
          ...item,
          // 添加新的属性 
          comment_length: item.comments.length
        }
      })
    });
  },
}
</script>

<style lang = "less" scoped>
</style>