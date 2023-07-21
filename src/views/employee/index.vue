<template>
  <div class="dashboard-container">
    <div class="app-container">
      <a-card class="tools-card">
        <a-button type="primary">新增员工</a-button>
      </a-card>
      <a-card>
        <a-table
          :columns="columns"
          :dataSource="list"
          :pagination="{
            current: pageParams.page,
            pageSize: pageParams.size,
            total: pageParams.total,
            onChange: changePage
          }"
        >
          <template #bodyCell="{ column, record }">
            <!-- 头像 -->
            <template v-if="column.dataIndex === 'staffPhoto'">
              <a-avatar :size="50" :src="record.staffPhoto || DefaultImg"></a-avatar>
            </template>
            <!-- 入职时间 -->
            <template v-if="column.dataIndex === 'timeOfEntry'"> {{ formatTimeOfEntry }} </template>
            <!-- 操作 -->
            <a-space v-if="column.dataIndex === 'operate'">
              <a-button type="primary">编辑</a-button>
              <a-button type="danger">删除</a-button>
            </a-space>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getEmployeeList } from '@/api/employee'
import DefaultImg from '@/assets/default.png'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '序号',
    customRender({ index }) {
      return (pageParams.page - 1) * pageParams.pagesize + index + 1
    }
  },
  {
    title: '姓名',
    dataIndex: 'username'
  },
  {
    title: '头像',
    dataIndex: 'staffPhoto'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '工号',
    dataIndex: 'workNumber'
  },
  {
    title: '聘用形式',
    dataIndex: 'formaOfEmployment'
  },
  {
    title: '部门',
    dataIndex: 'departmentName'
  },
  {
    title: '入职时间',
    dataIndex: 'timeOfEntry'
  },
  {
    title: '操作',
    dataIndex: 'operate'
  }
]
const list = ref([])

onMounted(() => {
  getList()
})
const formatTimeOfEntry = ref([])
//获取列表
const getList = async () => {
  const close = message.loading('员工数据加载中')
  const { rows, total } = await getEmployeeList(pageParams)
  list.value = rows
  // console.log(rows)
  pageParams.total = total
  //格式化时间
  rows.forEach((item) => {
    item.timeOfEntry = item.timeOfEntry ? dayjs(item.timeOfEntry).format('YYYY-MM-DD') : ''
    formatTimeOfEntry.value = item.timeOfEntry
    console.log(item.timeOfEntry)
  })
  close()
}
const pageParams = reactive({
  page: 1,
  pagesize: 10,
  total: 0
})
const changePage = (page, pagesize) => {
  pageParams.page = page
  pageParams.pagesize = pagesize
  getList()
}
</script>

<style scoped>
.app-container {
  padding: 16px;
}
.tools-card {
  margin-bottom: 16px;
}
</style>
