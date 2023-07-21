<template>
  <a-modal title="新增员工" v-model:visible="showDialogComputed">
    <a-form :labelCol="{ span: 4 }">
      <a-form-item label="用户名" name="username" v-bind="form.validateInfos.username">
        <a-input v-model:value="formData.username" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item label="手机号" name="mobile" v-bind="form.validateInfos.mobile">
        <a-input v-model:value="formData.mobile" placeholder="请输入手机号"></a-input>
      </a-form-item>
      <a-form-item label="入职时间" name="timeOfEntry" v-bind="form.validateInfos.timeOfEntry">
        <a-date-picker
          valueFormat="YYYY-MM-DD hh:mm:ss"
          v-model:value="formData.timeOfEntry"
          placeholder="请选择入职时间"
        >
        </a-date-picker>
      </a-form-item>
      <a-form-item
        label="聘用形式"
        name="formOfEmployment"
        v-bind="form.validateInfos.formOfEmployment"
      >
        <a-select v-model:value="formData.formOfEmployment" placeholder="请选择聘用形式">
          <a-select-option :value="1">正式</a-select-option>
          <a-select-option :value="2">外包</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="工号" name="workNumber" v-bind="form.validateInfos.workNumber">
        <a-input-number
          v-model:value="formData.workNumber"
          placeholder="请输入工号"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="部门" name="departmentName" v-bind="form.validateInfos.departmentName">
        <a-input v-model:value="formData.departmentName" placeholder="请选择部门"></a-input>
      </a-form-item>
      <a-form-item
        label="转正时间"
        name="correctionTime"
        v-bind="form.validateInfos.correctionTime"
      >
        <a-date-picker
          valueFormat="YYYY-MM-DD hh:mm:ss"
          v-model:value="formData.correctionTime"
          placeholder="请选择转正时间"
        >
        </a-date-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import { computed, ref, reactive } from 'vue'
import { Form } from 'ant-design-vue'

const { showDialog } = defineProps({
  showDialog: Boolean
})
const emits = defineEmits(['update:showDialog'])
const showDialogComputed = computed({
  get() {
    return showDialog
  },
  set(val) {
    emits('update:showDialog', val)
  }
})
const initValues = {
  username: '',
  mobile: '',
  formOfEmployment: '',
  workNumber: '',
  departmentName: '',
  timeOfEntry: '',
  correctionTime: ''
}
const formData = ref(initValues) // 声明一个响应式数据
// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '用户姓名不能为空', trigger: 'blur' },
    // min 最短长度 max最大长度
    {
      min: 1,
      max: 4,
      message: '用户姓名为1-4位'
    }
  ],
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
  workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
  departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
  timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }]
})
const form = Form.useForm(formData.value, rules) // ref声明的数据在 js中必须加.value
</script>
<style></style>
