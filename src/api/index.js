
// 1️⃣ 导入自己封装的 axios 实例
import request from '@/utils/request'

// 2️⃣ 导出接口函数
export const userLogin = (data) => {
  // 函数返回值
  return request({
    method: 'POST', // 方式请求：POST
    url: '/login', // 请求地址：/login
    data: data, // 请求参数：调用函数的时候传入
  })
}