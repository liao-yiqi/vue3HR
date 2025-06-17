<script setup>
import { onMounted, ref } from 'vue'
import { getProjectAll } from '@/api/project'
import { useRouter } from 'vue-router'
import useUiElementStore from '@/stores/modules/uiElement'

const fieldName = ref({ label: 'name', value: 'id' })
const projectOptions = ref([])
const getManagement = async () => {
  const { data } = await getProjectAll()
  projectOptions.value = data
}

const selectedProject = ref(null)
const projectInfo = ref(null)
const { setUiElementState, setComponentsName, platformDict } =
  useUiElementStore()
const infoFields = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Platform', key: 'platformIds' },
]
const handleProjectChange = (val) => {
  const selected = projectOptions.value.find((item) => item.id === val)
  projectInfo.value = selected
}

onMounted(() => {
  getManagement()
})

const router = useRouter()
const onBack = () => {
  router.go(-1)
}

const bottomCards = [
  { top: 'Modual', bottom: 'Management' },
  { top: 'UI Element', bottom: 'Management' },
]

const onCheck = () => {
  setComponentsName('UIElement')
  setUiElementState(projectInfo.value)
  router.push('/dashboardDetails')
}
</script>

<template>
  <div class="page">
    <a-card title="UI Element Details" bordered>
      <template #extra>
        <a-button type="link" @click="onBack" style="padding: 0">
          返回
        </a-button>
      </template>
      <div class="detail-container">
        <div class="detail-item">
          <span class="label">Project:</span>
          <a-select
            v-model:value="selectedProject"
            placeholder="Select a project"
            style="width: 200px"
            allowClear
            :field-names="fieldName"
            :options="projectOptions"
            @change="handleProjectChange"
          />
        </div>
        <div class="detail-item" v-for="item in infoFields" :key="item.key">
          <span class="label">{{ item.label }}:</span>
          <span>
            {{
              item.key === 'platformIds'
                ? platformDict[projectInfo?.[item.key]] || '--'
                : projectInfo?.[item.key] || '--'
            }}</span
          >
        </div>
      </div>
      <a-divider />
      <div class="bottom-section">
        <div
          class="card-item"
          v-for="(card, index) in bottomCards"
          :key="index"
          @click="onCheck"
        >
          <div class="card-text">{{ card.top }}</div>
          <div class="card-text">{{ card.bottom }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.page {
  padding: 15px;
}
.detail-container {
  padding: 16px;
  width: 300px;
}

.detail-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.label {
  display: inline-block;
  width: 80px;
  font-weight: 500;
}

.bottom-section {
  display: flex;
  gap: 24px;
  justify-content: flex-start;
}

.card-item {
  width: 160px;
  height: 100px;
  border-radius: 8px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: #0050b3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
}

.card-item:hover {
  background-color: #bae7ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}

.card-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}
</style>
