// 导入vue  全局可以使用 
import Vue from 'vue'

// API 服务器的地址
export const baseURL = `http://127.0.0.1:3000`

// 把 baseURL 挂载到 Vue 的原型上，好处：所有的 Vue 组件都能共享该变量 js文件不可 还是要引入  
// </template>里面不用写$  scr里面要$baseURl
Vue.prototype.$baseURL = baseURL