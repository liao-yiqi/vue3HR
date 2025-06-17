import axios from 'axios'
import { message as Msg } from 'ant-design-vue'
import useToken from '@/stores/token'

//使用axios创建实例 new Vue() createApp()
const serive = axios.create({
  //初始化参数
  baseURL: '/api',
})
//请求拦截器
serive.interceptors.request.use(
  (config) => {
    const { token } = useToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
//响应拦截器
serive.interceptors.response.use(
  (res) => {
    const { statusCode, message, data } = res.data //axios默认加了一层data
    if (statusCode === 200) {
      //表示执行成功
      return res.data //返回数据
    }
    //提示
    Msg.error(message || '接口调用失败')
    return Promise.reject(new Error(message || '接口调用失败'))
  },
  (error) => {
    Msg.error(error.message || '请求出错')
    return Promise.reject(error)
  }
)
//导出工具
export default serive
