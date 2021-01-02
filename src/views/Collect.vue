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
      // 因为这个后台接口没有给  comment_length 这个属性 但是我们前面组件渲染的时候是用  comment_length 这个属性 所以我们可以选择添加这个属性 进行渲染数据
      this.list = res.data.data.map((item) => {
        return {
          // 展开对象 免得覆盖
          ...item,
          // 添加新的属性等于这个接口里面的值 在前面好渲染 避免报错 拿不到数据
          comment_length: item.comments.length
        }
      })
    });
  },
}
</script>

<style lang = "less" scoped>
</style>