import layout from "@/views/layout/index.vue";
export default {
  path: "/setting", // 路由地址
  component: layout,
  children: [
    {
      path: "", // 二级路由写个空 表示 它是默认的二级路由
      component: () => import("@/views/setting/index.vue"),
      meta: {
        title: "公司设置",
        icon: "SettingOutlined",
      },
    },
  ],
};
