import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import toolsRouter from './modules/tools'
import usersRouter from './modules/users'
import settingRouter from './modules/setting'
import seleniumHubRouter from './modules/seleniumHub'
import reportCenter from './modules/reportCenter'
// 动态数组
const asyncRoutes = [
  toolsRouter,
  seleniumHubRouter,
  reportCenter,
  usersRouter,
  settingRouter,
]
// 固定路由
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/dashboard', // 跳转
    component: Layout,
    // 子节点
    children: [
      {
        path: 'dashboard', // 二级路由的地址
        component: () => import('@/views/dashboard/index.vue'),
        // 路由元信息
        meta: {
          title: 'Dashboard',
          icon: 'HomeOutlined',
        },
      },
      {
        path: 'UIElement',
        name: 'UIElement Management',
        component: () =>
          import('@/views/dashboard/components/UIElement/index.vue'),
        hidden: true,
      },
      {
        path: 'dashboardDetails',
        name: 'details',
        component: () =>
          import('@/views/dashboard/components/Details/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...asyncRoutes], // 合并固定路由 和静态路由
})

export default router
