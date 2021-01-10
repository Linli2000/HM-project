<template>
  <div class="search">
    <!-- 头部布局 -->
    <div class="header">
      <i class="iconfont iconjiantou2"
         @click="backHandle"></i>
      <div class="search_in">
        <i class="iconfont iconsearch"></i>
        <input type="text"
               placeholder="血条消失之术"
               v-model="keyword"
               @keyup.enter="SearchHander"
               ref="search_dom"
               class="search_input" />
      </div>
      <p class="search_btn"
         @click="SearchHander">搜索</p>
    </div>
    <!-- 历史记录 -->
    <div class="history"
         v-show="history.length">
      <h3 class="title">
        <span>历史记录</span>
        <span @click="clearHistoryHandle">清除记录</span>
      </h3>
      <ul class="list"
          v-for=" (item ,index) in history"
          :key="index"
          @click="historySearchHandle(item)">
        <li>{{item}}</li>

      </ul>
    </div>
    <!-- 热门搜索 -->
    <div class="hot">
      <h3 class="title">热门搜索</h3>
      <ul class="list">
        <li>前端58期</li>
        <li>前端58期</li>
        <li>前端58期</li>
        <li>前端58期</li>
        <li>前端58期</li>
        <li>前端58期</li>
      </ul>
    </div>
    <!-- 搜索提示 -->
    <ul class="tips"
        v-show="isShowTips">
      <li class="tips_item"
          @click="$router.push(`/detail/${item.id}`)"
          v-for="item in list"
          :key="item.id">
        <span class="tips_title">{{item.title}}</span>
        <i class="iconfont iconjiantou1"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPostSearch } from '@/api';
import { setHistory, getHistory, removeHistory } from "@/utils/local"
export default {
  data () {
    return {
      isShowTips: false,
      keyword: '',
      list: [],
      history: [],
    };
  },
  // 一直监听
  watch: {
    // 监听关键词的变化 
    keyword (val) {
      // 如果为空，关闭提示盒子
      if (val === "") {
        this.isShowTips = false;
      }
    },

    // 监听history的值  相当于监听keyword的值
    history (val) {
      setHistory(val)
    }
  },
  // 页面加载完毕就渲染的
  mounted () {
    this.$refs.search_dom.focus()
    //  获取历史记录  history
    // 等于获取到的值 然后在上面循环渲染
    this.history = getHistory();

  },
  methods: {

    // 根据历史内容点击搜索
    historySearchHandle (item) {
      // 把拿到的数据更新到data的keyword中
      this.keyword = item,
        // 然后重新调用搜索事件
        this.SearchHander()
    },
    // 清楚历史记录
    clearHistoryHandle () {
      // 清空 data 的数据，更新视图
      this.history = [];
      //  清空 本地存储数据，下次进来就没有了
      // removeHistory();
    },
    // 点击搜索事件
    SearchHander () {
      if (this.keyword === "") {
        return this.$toast("请输入内容哦...");
      }
      getPostSearch({
        keyword: this.keyword,
        pagesSize: 5
      }).then((res) => {
        // console.log(res),
        this.list = res.data.data;
        this.isShowTips = true;
        // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
        this.history.unshift(this.keyword)
        // ... 展开运算符，可以把对象或者数组展开成逗号分隔的数据
        this.history = [...new Set(this.history)];
        // 设置 保存历史记录  history传递的值 前面有转化
        // setHistory(this.history)
      })
    },

    // 点击返回按钮
    backHandle () {
      // 如果有搜索关键词，清空搜索关键词
      if (this.keyword) {
        this.keyword = "";
      } else {
        // 没有搜索关键词实现返回
        this.$router.back();
      }
    },
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #f2f2f2;
  // 头部
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .iconjiantou2 {
      font-size: 14px;
    }

    .search_in {
      flex: 1;
      display: flex;
      margin: 0 10px;
      position: relative;
      .iconsearch {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 18px;
        color: #999;
      }

      input {
        flex: 1;
        height: 40px;
        border: 1px solid #666;
        border-radius: 20px;
        background-color: transparent;
        font-size: 14px;
        padding-left: 35px;
      }
    }

    p {
      font-size: 14px;
      color: #333;
    }
  }
  // 历史记录
  .history {
    margin-top: 10px;
    padding: 0 10px;
    border-bottom: 1px solid #000;
    .title {
      font-weight: normal;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        margin: 10px 0;
        font-size: 10px;
      }
    }
  }
  // 热门搜索
  .hot {
    padding: 0 10px;
    margin-top: 10px;
    h3 {
      font-weight: normal;
      font-size: 13px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        margin: 10px 0;
        font-size: 10px;
      }
    }
  }
  // 搜索提示
  .tips {
    position: absolute;
    left: 0;
    right: 0;
    top: 63px;
    bottom: 0;
    background-color: #f2f2f2;
    .tips_item {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin: 10px;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      .tips_title {
        font-size: 15px;
      }

      .iconjiantou1 {
        color: #999;
      }
    }
  }
}
</style>