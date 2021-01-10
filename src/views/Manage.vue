<template>
  <div id="app">
    <!-- 1.0 导航栏 -->
    <van-nav-bar title="栏目管理"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- 2.0 删除频道模块 -->
    <div class="manage">
      <h3 class="manage_title">点击删除以下频道</h3>
      <ul class="manage_list">
        <li class="manage_item"
            v-for="(item,index) in activeList"
            :key="item.id"
            @click="removeItemHandle(index)">{{item.name}}</li>
      </ul>
    </div>
    <!-- 3.0 添加频道模块 -->
    <div class="manage">
      <h3 class="manage_title">点击添加以下频道</h3>
      <ul class="manage_list">
        <li class="manage_item add_item"
            v-for="(item,index) in diActiveList"
            :key="item.id"
            @click="addItemHandle(index)">{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { getCategory } from '@/api'
import { getManage, setManage } from '@/utils/local';
export default {
  data () {
    return {
      // 未删除的数组
      activeList: [],
      // 删除的数组 根据点击的索引拿到
      diActiveList: [],
    }
  },
  // 监听变化 
  watch: {
    // 监听其中一个值即可 当activeList 的值发生变化时  就把变化后的值更新到本地存储
    activeList (val) {
      // console.log(val);
      setManage({
        activeList: this.activeList,
        diActiveList: this.diActiveList,
      })
    }
  },
  methods: {
    // 点击删除事件 移出某个关注栏目
    removeItemHandle (index) {
      // 从用户点击的索引里面 拿到是点击的哪一个 并且删掉  
      // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
      const res = this.activeList.splice(index, 1);
      // console.log(res);
      // <!-- 将一个数组添加到另一个数组的尾部 可以用es6 新语法  ... -->
      this.diActiveList.push(...res)
    },
    // 点击添加关注
    addItemHandle (index) {
      // console.log(item);
      const res = this.diActiveList.splice(index, 1)
      this.activeList.push(...res)
    }

  },

  mounted () {
    // 获取本地存储中是否有数据 如果有就展示本地存储的数据 如果没有就发送后台请求
    const { activeList, diActiveList } = getManage()
    if (activeList) {
      this.activeList = activeList;
      this.diActiveList = diActiveList
    } else {
      // 默认的情况下,获取到的所有分类都是没删除 活跃的状态
      getCategory().then((res) => {
        // console.log(res);
        this.activeList = res.data.data
        // 更新到本地存储中 获取之后就可以保存了 因为已经有了数据 
        setManage({ activeList: res.data.data, diActiveList: [] })
      })
    }
  }
}


</script>
<style lang="less" scoped>
.manage {
  padding: 10px;
  .manage_title {
    font-weight: normal;
    font-size: 13px;
    line-height: 30px;
  }
  .manage_list {
    display: flex;
    flex-wrap: wrap;
    .manage_item {
      height: 30px;
      width: 23%;
      margin: 1%;
      border: 1px solid #ccc;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &.add_item::after {
        content: "+";
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>