<template>
  <div id="app">
    <!-- 1.0 首页头部 -->
    <div class="header">
      <!-- 1.1 左边 logo 图标 -->
      <span class="iconfont iconnew"></span>
      <!-- 1.2 中间搜索框 -->
      <div class="search"
           @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <!-- 1.3 右侧 个人中心图标 -->
      <span class="iconfont iconwode"
            @click="$router.push('/userinfo')"></span>
    </div>

    <!-- 2.0 tabs 分类切换 -->
    <van-tabs v-model="activeIndex">
      <van-tab v-for="item in cateList "
               :key="item.id"
               :title="item.name">
        <!-- 新闻列表 -->

        <!-- 循环遍历只是循环这个组件需要多少个 postList有多少个就会遍历出来多少个 然后postData是自己定义的 需要传送到子组件的值  item2 是遍历出来的每一项 -->
        <!-- van-list分页 包裹整个新闻列表 -->
        <van-list v-model="item.loading"
                  :finished="item.finished"
                  finished-text="😀我也是有底线的"
                  @load="loadMorePost">
          <PostItem v-for="item2 in item.postList"
                    :key="item2.id"
                    :postData="item2" />
        </van-list>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getCategory, getPostList } from '@/api';
import PostItem from '@/components/PostItem'
export default {
  // 组件注册
  components: {
    PostItem
  },
  data () {
    return {
      activeIndex: 0,
      // tab栏的列表数据
      cateList: [],
      // 新闻列表的数据
      postList: [],

    }
  },
  //  变量监听 监听上面tab栏的变化 如果变化就拿到监听变化到哪一个值上 就拿到他的索引 然后找索引里面的id发送请求
  watch: {
    activeIndex (index) {
      // 如果postlist 新闻列表那一项的数组长度为0 才发送新的请求 免得造成每次都发送
      if (this.cateList[index].postList.length === 0) {
        this.getPostListData()
      }
    }
  },
  //每次页面加载就执行 mounted   用created也可以
  mounted () {
    // 获取头部下面的导航栏
    getCategory().then((res) => {
      // console.log(res);
      // 使用map先拿到每一项数据 (map映射)  给每一项先加一个postlist 加一个空数组
      this.cateList = res.data.data.map((item) => {
        return {
          ...item,
          postList: [],
          // 页码初始化的值 因为每一页的数据不一样  但是最开始展示的页码都是第一页 往下加载就是初始值+1 得到新页码里面的数据  比如说第一页是5条数据  第二页(页码)就是5-10(页容量)的数据
          pageIndex: 1,
          pageSize: 5,
          loading: false,
          finished: false
        }
      })
      // getPostListData 获取新闻列表 注意异步操作
      this.getPostListData();
    })
  },
  methods: {
    // 分页的事件 
    loadMorePost () {
      console.log('aaa');
      // 这页本来要加载完毕 即将加载下一页 就这页页码+1
      this.cateList[this.activeIndex].pageIndex += 1;
      this.getPostListData()
    }
    ,
    // 以后会用到多次 所以封装起来 方便后期使用
    getPostListData () {
      // console.log(val);
      const { id, pageIndex, pageSize } = this.cateList[this.activeIndex];
      getPostList({
        category: id,  //分类id
        pageSize: pageSize,//页容量
        pageIndex: pageIndex  //页码
      }).then((res) => {
        // console.log(res);
        // this.postList = res.data.data
        // 把返回的数据直接添加到castlist里面 当前点击哪个tab栏就直接直接成为castlist他的属性
        // this.cateList[this.activeIndex].postList = res.data.data;
        // 因为如果不... 就会覆盖前面的值 而不是增加
        this.cateList[this.activeIndex].postList.push(...res.data.data);
      })
    }
  },


}
</script>

<style lang = "less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: red;
  color: #fff;
  padding: 0 15px;
  .iconnew {
    font-size: 45px;
  }

  .search {
    flex: 1;
    height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    // 只需要大于等于盒子高度的一般，就是这个胶囊型圆角盒子
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    .iconsearch {
      margin-right: 3px;
    }

    span {
      font-size: 12px;
    }
  }

  .iconwode {
    font-size: 25px;
  }
}
</style>