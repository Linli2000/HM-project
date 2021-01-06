// 搜索历史记录的 键名称
const HMTT_HISTORY = 'HMTT_HISTORY'

// 设置历史记录
export const setHistory = (array) =>
  localStorage.setItem(HMTT_HISTORY, JSON.stringify(array))

// 获取历史记录
export const getHistory = () =>
  JSON.parse(localStorage.getItem(HMTT_HISTORY)) || []

// 清空历史记录
export const removeHistory = () => localStorage.removeItem(HMTT_HISTORY)
