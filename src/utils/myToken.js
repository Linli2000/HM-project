// 把字符串存到一个变量中 代码会有提示  只是方便使用而已 不是逻辑代码
const TOKEN_HMTT='TOKEN_HMTT'
const USERINFO_HMTT='USERINFO_HMTT'

// 设置本地存储 拿到token值
export const setToken=(tokenStr)=>{
  localStorage.setItem(TOKEN_HMTT,tokenStr)
} 
//  获取本地存储  需要返回值 所以要return  返回一个结果  这个结果对你判断方法 
export const getToken=()=>{
  return localStorage.getItem(TOKEN_HMTT) || ''
}
//  删除本地存储 
export const removeToken=()=>{
  localStorage.removeItem(TOKEN_HMTT)
}

// 设置本地存储  拿到用户数据
 export const setUserInfo = (obj) => {
  localStorage.setItem(USERINFO_HMTT, JSON.stringify(obj))
}

// 获取使用本地存储用户信息
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USERINFO_HMTT)) || {}
}

// 删除本地存储用户信息
export const removeUserInfo = () => {
  localStorage.removeItem(USERINFO_HMTT)
}