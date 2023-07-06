import axios from 'axios'

//使用axios创建实例 new Vue() createApp()
const serive = axios.create({
  //初始化参数
  baseURL: '/api'
})
//请求拦截器
serive.interceptors.request.use()
//响应拦截器
serive.interceptors.response.use()
//导出工具
export default serive
