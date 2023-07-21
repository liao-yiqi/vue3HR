import layout from '@/views/layout/index.vue'

export default {
  path: '/employee',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employee/index.vue'),
      meta: {
        title: '公司员工',
        icon: 'TeamOutlined'
      }
    }
  ]
}
