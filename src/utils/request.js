// 导入 axios
import axios from 'axios'
import { baseURL } from './baseURL'

// 创建 axios 实例
const instance = axios.create({
  // 线上的
  // baseURL: 'http://157.122.54.189:9083',
  // 本地
  baseURL:baseURL
})

// 导出 axios 实例
export default instance