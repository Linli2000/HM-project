import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入页面文件
import Home from '../views/Home.vue'
import login from '../views/Login'
import Register from '@/views/Register.vue'
import Userinfo from '@/views/Userinfo.vue'
import Useredit from '@/views/Useredit.vue'
import Attention from '@/views/Attention.vue'
import Collect from '@/views/Collect.vue'




// 测试页面
import Text from '@/dome/TestFollows.vue'
import Router from '../dome/TextRouter.vue'


import { getToken } from '@/utils/myToken'

Vue.use(VueRouter)

// 路由配置表 通过路径切换页面s
const routes = [
  {
    path: '/router',
    name: 'Router',
    component:Router
  } ,
  {
    path: '/text',
    name: 'Text',
    component: Text
  },
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
  },
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: Userinfo,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/useredit',
    name: 'Useredit',
    component:Useredit,
    meta: {
      isAuth: true,
    },
  },
  ,
  {
    path: '/attention',
    name: 'Attention',
    component:Attention,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/collect',
    name: 'Collect',
    component: Collect,
    meta: {
      isAuth: true,
    },
  }
]

const router = new VueRouter({
  routes
})


// 使用 router.beforeEach 注册一个全局前置守卫：
router.beforeEach(( to, from, next) => {
  // console.log('去往哪个城市(页面) -- to', to)
  // console.log('来自哪个城市(页面) - from', from)
  // console.log('下一个 - next 是一个函数', next)
  // 代码的最后一定要记得放行，忘记放行就看不到任何页面了   
  // to.meta.isAuth  需要用户登录后才能访问的页面  如果跳转下个页面里面有true这个属性 加了这个属性就是需要判断是不是需要登录才能看的页面 就是导航守卫
  //  如果有就判断是不是有token值有跳转  
  if(to.meta.isAuth == true){
  if(!getToken()){
    // router.push(location) 想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
    // router.replace(location)跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
     return router.replace ('/login')
     }
}
  next() 
})

export default router
