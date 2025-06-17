<template>
  <div class="page">
    <a-card title="Project Details" :bordered="false">
      <template #extra>
        <a-button type="link" @click="goBack">返回</a-button>
      </template>
      <div class="page-top">
        <div class="project-info">
          <p><strong>Project ID:</strong> {{ uiElementState.id }}</p>
          <p><strong>Project Name:</strong> {{ uiElementState.name }}</p>
        </div>
        <a-divider />
        <div class="page-table">
          <a-button type="primary">新增</a-button>
          <a-table
            :columns="columns"
            :data-source="tableData"
            :loading="loading"
            row-key="id"
            bordered
            size="middle"
            style="margin-top: 16px"
            :row-selection="rowSelection"
          />
        </div>
      </div>
      <a-divider />
      <div class="locator-list">
        <a-card
          v-for="item in locatorList"
          :key="item.id"
          class="locator-card"
          hoverable
          size="small"
        >
          <div class="locator-content">
            <div class="platform-title">
              {{ platformDict[item.platformId] || 'Unknown Platform' }}
            </div>
            <div class="info-row"><strong>ID:</strong> {{ item.id }}</div>
            <div class="info-row"><strong>Name:</strong> {{ item.name }}</div>
            <div class="info-row">
              <strong>Locator Value:</strong> {{ item.value }}
            </div>
            <div class="info-row">
              <strong>Is Featured:</strong>
              <a-switch v-model:checked="item.isFeatured" disabled/>
            </div>
            <div class="info-row">
              <strong>Comment:</strong> {{ item.comment }}
            </div>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import useUiElementStore from '@/stores/modules/uiElement'
import { getElementByPageIdAPI } from '@/api/element'
import { getLocatorsAPI } from '@/api/locators'

const { uiElementState, platformDict } = useUiElementStore()

// 表格数据
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Short Name', dataIndex: 'shortName', key: 'shortName' },
  { title: 'Modual ID', dataIndex: 'pageId', key: 'pageId' },
  { title: 'Comment', dataIndex: 'comment', key: 'Comment' },
]

const tableData = ref([])
const loading = ref(true)
const getElementList = async () => {
  const { data } = await getElementByPageIdAPI(1)
  tableData.value = data
  loading.value = false
}

onMounted(() => {
  getElementList()
})

// 返回
const router = useRouter()
const goBack = () => {
  router.back()
}

const locatorList = ref([])
const getLocator = async (params) => {
  const { data } = await getLocatorsAPI(params)
  locatorList.value = data
}

const selectedRow = ref(null)
const rowSelection = {
  type: 'radio',
  onChange: (selectedRowKeys, selectedRows) => {
    selectedRow.value = selectedRows[0]
    const params = {
      elementId: selectedRow.value.id,
    }
    getLocator(params)
  },
}
</script>

<style lang="less" scoped>
.project-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.platform-title {
  font-size: 16px;
  font-weight: 600;
  color: #1677ff;
  margin-bottom: 8px;
}

.locator-list {
  display: flex;
  flex-wrap: wrap;  
  gap: 16px;
  margin-top: 24px;
}

.locator-card {
  width: calc((100% - 32px) / 3); /* 3列布局，减去gap后平均 */
  min-width: 240px;
}

.locator-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.value-text {
  font-size: 16px;
  font-weight: 600;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
</style>
