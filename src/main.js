import { createApp } from "vue";
import store from './stores'

import AntDesign from "ant-design-vue"; // 引入全局包
import "ant-design-vue/dist/antd.less"; // less - css的预处理器 可以写嵌套语法 可以写变量
import App from "./App.vue";
import router from "./router";
// import "@/permission";
import Icons from "@/components/Icons";

const app = createApp(App);
app.use(store) // 注册pinia
app.use(router);
app.use(AntDesign); // 注册全局组件
app.use(Icons); //注册图标

app.mount("#app");
