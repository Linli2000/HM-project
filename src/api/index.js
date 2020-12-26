
//1️⃣  导入自己封装的 axios 实例
import { getToken } from '@/utils/myToken'
import request from '@/utils/request'

// 2️⃣ 导出接口函数
// 登录页面的
export const userLogin = (data) => {
  // 函数返回值
  return request({
    method: 'POST', // 方式请求：POST
    url: '/login', // 请求地址：/login
    data: data, // 请求参数：调用函数的时候传入
  })
}

// 注册页面的
export const userRegister = (data) => {
  // 函数返回值
  return request({
    method: 'POST', // 方式请求：POST
    url: '/register', // 请求地址：/login
    data: data, // 请求参数：调用函数的时候传入
  })
}

// 用户详情页   需要传入id拼接url 后台需要验证 【Authorization】 :token值
export const userDetail=(id)=>{
  return request({
  method: 'GET', 
    url: `/user/${id}`, 
    headers:{
      Authorization:getToken()
    }
})
}
//文件上传 图片预览那里的
  export const uploadFile=(file)=>{
    return request({
    method: 'POST', 
      url: `/upload`, 
      data:file,
      headers:{
        Authorization:getToken()
      }
  })
}
// 编辑用户信息 得把编辑好的数据拿回来
export const userUpdate = ({ id, ...data }) => {
  return request({
    method: 'POST',
    url: `/user_update/${id}`,
    data: data,
    headers: {
      Authorization: getToken(),
    },
  })
}
