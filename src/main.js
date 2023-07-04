import { createApp } from 'vue' //按需引入vue依赖包 按照需要的引入
import { createPinia } from 'pinia' //插件-提供共享状态的功能

import App from './App.vue' //组件 一个 .vue就是一个组件 根组件-整个应用最底层的组件
import router from './router' // 路由- SPA-Single Page Application 项目-地址-组件

const app = createApp(App) //创建一个vue3的应用实例 对象 实例

app.use(createPinia()) //先创建pinia实例,再完成它的注册
app.use(router) //注册路由 vue2-vue.use() vue3-app.use()-注册插件

app.mount('#app') //mount挂载的意思 app实例最终要挂载到哪个dom元素上
