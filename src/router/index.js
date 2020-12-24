import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入页面文件
import Home from '../views/Home.vue'
import login from '../views/Login'
import Register from '@/views/Register.vue'
import Userinfo from '@/views/Userinfo.vue'

Vue.use(VueRouter)

// 路由配置表 通过路径切换页面s
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/userinfo',
    name: 'Userinfo',
    component: Userinfo,
  },
]

const router = new VueRouter({
  routes
})

export default router
