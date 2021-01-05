// 导入 Vue 构造函数
import Vue from 'vue'
// 创建一个全新的 Vue 实例，用于实现事件总线的 Vue 实例
export default new Vue()

// A组件需要b组件里面的东西来干事情 A 就$emit  B就on接收 然后写事件处理函数