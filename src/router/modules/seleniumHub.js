import layout from '@/views/layout/index.vue'

export default {
  path: '/seleniumHub',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/seleniumHub/index.vue'),
      meta: {
        title: 'seleniumHub',
        icon: 'ToolOutlined',
      },
    },
  ],
}
