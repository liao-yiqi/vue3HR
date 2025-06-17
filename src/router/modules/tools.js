import layout from '@/views/layout/index.vue'

export default {
  path: '/tools',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/tools/index.vue'),
      meta: {
        title: 'Tools',
        icon: 'ToolOutlined',
      },
    },
  ],
}
