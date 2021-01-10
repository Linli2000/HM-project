<template>
  <div id="app">
    <MyTable :data="list">
      <template slot-scope="scope">
        <td>
          {{scope.row.add}}
        </td>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from '@/components/dome/MyTable.vue'

export default {
  components: { MyTable },
  data () {
    return {
      list: [
        {
          title: "关晓彤回家收衣服",
          add: "广州"
        }, {
          title: "妈妈唱儿歌",
          add: "湖北"
        }, {
          title: "鹿晗关晓彤恋爱",
          add: "上海"
        }
      ]
    }
  },

  methods: {

  },

  mounted () {

  },
}
</script>

<style lang = "less" scoped>
</style>