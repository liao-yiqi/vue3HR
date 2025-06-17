import layout from '@/views/layout/index.vue'

export default {
  path: '/users',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/users/index.vue'),
      meta: {
        title: 'Users',
        icon: 'TeamOutlined',
      },
    },
  ],
}
