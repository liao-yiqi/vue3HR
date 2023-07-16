<template>
  <div class="container">
    <a-tabs class="setting-tab">
      <a-tab-pane key="role" tab="角色设置">
        <a-button type="primary" style="margin-bottom: 16px">新增角色</a-button>
        <a-table
          :columns="columns"
          :dataSource="list"
          :pagination="{
            current: pageParams.page,
            pageSize: pageParams.pagesize,
            total: pageParams.total,
            onChange: changePage
          }"
        ></a-table>
      </a-tab-pane>
      <a-tab-pane key="setting" tab="公司设置" force-render> </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getRoleList } from '@/api/setting'
//定义列信息
const columns = [
  { title: '序号' },
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
