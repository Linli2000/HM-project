// 搜索历史记录的 键名称
const HMTT_HISTORY = 'HMTT_HISTORY'
// 设栏目列表的  键名称
const HMTT_MANAGE = 'HMTT_MANAGE'

// 设置 保存历史记录
export const setHistory = (array) =>
  localStorage.setItem(HMTT_HISTORY, JSON.stringify(array))

// 获取历史记录
export const getHistory = () =>
  JSON.parse(localStorage.getItem(HMTT_HISTORY)) || []

// 清空历史记录
export const removeHistory = () => localStorage.removeItem(HMTT_HISTORY)


// 设置保存栏目数据 从前面传递过来的 包含选中和未选中的
export const setManage=(Object)=>{
  localStorage.setItem(HMTT_MANAGE, JSON.stringify(Object))
}
// 获取栏目项目数据 
export const getManage = () =>
  JSON.parse(localStorage.getItem(HMTT_MANAGE)) ||{}