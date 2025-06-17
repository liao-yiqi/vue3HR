<template>
  <div class="page">
    <div class="work-header">
      <a-avatar
        src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640"
        :size="72"
      />
      <div class="center">
        <p>早安, QA-Center Admin, 开始您一天的工作吧</p>
      </div>
    </div>
    <div class="page-container">
      <a-row>
        <a-col :span="24">
          <a-card title="Admin Panel">
            <a-row :gutter="[16, 16]">
              <a-col :span="3" v-for="item in cardItems" :key="item.top">
                <div class="mini-card" @click="onCheck">
                  <div class="mini-card-item">{{ item.top }}</div>
                  <div class="mini-card-item">{{ item.bottom }}</div>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const cardItems = [
  { top: 'Project', bottom: 'Management' },
  { top: 'UI Element', bottom: 'Management' },
]

const router = useRouter()
const onCheck = () => {
  router.push('/UIElement')
}
</script>
<style lang="less" scoped>
.work-header {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e4e4e4;
  align-items: center;
  .center {
    flex: 1;
    padding-left: 20px;
    p {
      &:first-child {
        font-size: 20px;
      }
      &:last-child {
        color: #666;
      }
    }
  }
}
.page-container {
  width: 100%;
  height: 100%;
  padding: 15px;
}

.mini-card {
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
.mini-card:hover {
  background-color: #bae7ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
}
.mini-card-item {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}
</style>
