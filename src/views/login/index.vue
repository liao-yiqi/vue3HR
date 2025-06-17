<template>
  <div class="login-container">
    <div class="logo"></div>
    <div class="form">
      <h3>qa-center system</h3>
      <a-card class="login-card">
        <!-- autocomplete不自动填充表单 -->
        <a-form :model="loginForm" autocomplete="off" @finish="onFinish">
          <a-form-item
            name="mobile"
            :rules="[{ required: true, message: '手机号不能为空', trigger: ['change', 'blur'] }]"
          >
            <!-- 手机号 -->
            <!-- v-model原理实现 v2-v3的变化  v-model :value-> modelValue -->
            <!-- v-model实现原理 :value  @input -->
            <a-input size="large" v-model:value="loginForm.mobile"></a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '密码不能为空', trigger: ['change', 'blur'] }]"
          >
            <a-input-password size="large" v-model:value="loginForm.password"></a-input-password>
          </a-form-item>
          <a-form-item name="isAgree" :rules="[{ validator: validatorAgree }]">
            <a-checkbox v-model:checked="loginForm.isAgree">用户平台使用协议</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button size="large" type="primary" block htmlType="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script setup>
// 实现表单的校验
// 1. 声明响应式数据
import { login } from '@/api/login'
import { useRouter } from 'vue-router'
import useToken from '@/stores/token'
import { reactive } from 'vue'

const router = useRouter()

const loginForm = reactive({
  // 手机号 密码  是否同意
  mobile: '13800000002',
  password: 'hm#qd@23!',
  isAgree: false // 纯前端数据
})

const onFinish = async (values) => {
  const { updateToken } = useToken()
  const data = await login(values)
  console.log(data)
  updateToken(data)

  //登录跳转
  router.push('/')
}

//自定义校验规则 rule是当前的规则 value是当前的值
const validatorAgree = (_rule, value) => {
  //判断value是不是true 如果不是true就报错
  //Promise是es6的一个构造函数 resolve成功 reject失败
  //_占位符，表示该参数不使用
  console.log(value)
  return value ? Promise.resolve() : Promise.reject(new Error('您必须同意用户协议'))
}
</script>

<style lang="less">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176);
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    box-shadow: 2px -5px 7px 5px rgba(0, 0, 0, 0.3);
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 50px;
    .ant-card {
      width: 320px;
      border: none;
      padding: 0;
    }
    h3 {
      padding-left: 30px;
      font-size: 24px;
    }
  }
}
</style>
