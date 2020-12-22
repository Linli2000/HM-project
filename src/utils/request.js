// 导入 axios
import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://157.122.54.189:9083',
})

// 导出 axios 实例
export default instance