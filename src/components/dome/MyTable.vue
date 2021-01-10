<template>
  <div id="app">
    <table>
      <tr v-for=" (item,index) in data"
          :key="index">
        <td>
          {{item.title}}
        </td>
        <slot :row="item" />
      </tr>
    </table>
  </div>
</template>

<script>

export default {

  props: ["data"],
  data () {
    return {

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