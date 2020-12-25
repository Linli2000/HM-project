// 把字符串存到一个变量中 代码会有提示  只是方便使用而已 不是逻辑代码
const TOKEN_HMTT='TOKEN_HMTT'

// 设置本地存储 拿到token值
export const setToken=(tokenStr)=>{
  localStorage.setItem(TOKEN_HMTT,tokenStr)
}
//  获取本地存储 
export const getToken=()=>{
  return localStorage.getItem(TOKEN_HMTT)
}
//  删除本地存储 
export const removeToken=()=>{
  localStorage.removeItem(TOKEN_HMTT)
}