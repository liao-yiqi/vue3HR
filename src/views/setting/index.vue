<template>
  <div class="container">
    <a-tabs class="setting-tab">
      <a-tab-pane key="role" tab="角色设置">
        <a-button @click="visible = true" type="primary" style="margin-bottom: 16px"
          >新增角色</a-button
        >
        <a-table
          :columns="columns"
          :dataSource="list"
          :pagination="{
            current: pageParams.page,
            pageSize: pageParams.pagesize,
            total: pageParams.total,
            onChange: changePage
          }"
        >
          <template #bodyCell="{ column }">
            <a-space v-if="column.dataIndex === 'operate'">
              <a-button type="primary">编辑</a-button>
              <a-button type="danger">删除</a-button>
            </a-space>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="setting" tab="公司设置" force-render> </a-tab-pane>
    </a-tabs>
    <a-modal
      title="新增角色"
      @cancel="btnCancel"
      @ok="btnOK"
      ok-text="确认"
      cancel-text="取消"
      v-model:visible="visible"
    >
      <!-- 放置表单内容 -->
      <a-form :rules="rules">
        <a-form-item v-bind="form.validateInfos.name">
          <a-input v-model:value="formData.name" placeholder="请输入角色名称"></a-input>
        </a-form-item>
        <a-form-item v-bind="form.validateInfos.description">
          <a-input v-model:value="formData.description" placeholder="请输入角色描述"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { addRole, getRoleList } from '@/api/setting'
//定义列信息
const columns = [
  {
    title: '序号',
    customRender({ index }) {
      //要和当前的分页数据进行集合
      return (pageParams.page - 1) * pageParams.pagesize + index + 1
    }
  },
  { title: '角色名称', dataIndex: 'name' },
  { title: '角色描述', dataIndex: 'description' },
  { title: '操作', dataIndex: 'operate' }
]
//获取角色列表
const getList = async () => {
  const { rows, total } = await getRoleList(pageParams)
  list.value = rows
  pageParams.total = total
}
const list = ref([])
onMounted(() => {
  getList()
})
//分页功能
const pageParams = reactive({
  page: 1,
  pagesize: 5,
  total: 0
})
const changePage = (page, pagesize) => {
  pageParams.page = page
  pageParams.pagesize = pagesize
  getList()
}
import { Form, message } from 'ant-design-vue'

const visible = ref(false) // 定义控制弹层的显示
// 定义响应式数据
const formData = reactive({
  name: '',
  description: ''
})
// 定义响应式的规则- ant-design-vue的要求
const rules = reactive({
  name: [{ required: true, message: '请输入角色名称' }],
  description: [{ required: true, message: '请输入角色描述' }]
})
// 利用ant-design-vue中Form的方法useForm
const form = Form.useForm(formData, rules) // 得到的是form实例
//表单确认
const btnOK = async () => {
  //手动校验表单数据
  await form.validate()
  //校验通过
  await addRole(formData)
  message.success('新增角色成功')
  //新增完成之后跳转到最后一页
  //计算最后一页的页码
  const lastPage = Math.ceil((pageParams.total + 1) / pageParams.pagesize)
  pageParams.page = lastPage
  //重置数据
  btnCancel()
  //重新获取数据
  getList()
  //关闭弹层
  visible.value = false
}
//表单取消
const btnCancel = () => {
  //重置字段 重置数据 消除校验提示
  form.resetFields()
}
</script>
<style lang="less" scoped>
.container {
  padding: 16px;
  .setting-tab {
    background-color: #fff;
    padding: 16px;
    height: calc(100vh - 93px);
  }
}
</style>
