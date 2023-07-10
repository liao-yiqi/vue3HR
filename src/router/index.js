import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      hidden: true
    },
    {
      path: '/',
      name: '/dashboard',
      component: Layout,
      //子节点
      children: [
        {
          path: 'dashboard', //二级路由地址
          component: () => import('@/views/dashboard/index.vue'), //二级路由组件
          meta: {
            title: '数据看板',
            icon: 'HomeOutlined'
          }
        }
      ]
    }
  ]
})

export default router
