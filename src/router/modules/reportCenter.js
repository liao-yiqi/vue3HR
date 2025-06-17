import layout from '@/views/layout/index.vue'

export default {
  path: '/reportCenter',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/reportCenter/index.vue'),
      meta: {
        title: 'reportCenter',
        icon: 'ToolOutlined',
      },
    },
  ],
}
