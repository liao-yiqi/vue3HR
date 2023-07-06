import { defineStore } from 'pinia'
import { ref } from 'vue'
const useToken = defineStore(
  'token',
  () => {
    const token = ref(null) //需要在token变化的时候,通知组件
    //修改token的方法
    const updateToken = (val) => (token.value = val)
    //删除token的方法
    const removeToken = () => (token.value = null)

    return { token, updateToken, removeToken }
  },
  { persist: true }
)
export default useToken
