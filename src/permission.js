//权限控制
import router from './router'
import useToken from './stores/token'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//前置导航守卫
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start() //开启进度条
  const { token } = useToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
//后置导航守卫
router.afterEach(() => {
  nprogress.done() //关闭进度条
})
