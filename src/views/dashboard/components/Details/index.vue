<template>
  <div class="page">
    <component :is="componentsMap[renderComponentsName]" />
  </div>
</template>

<script setup>
import useUiElementStore from '@/stores/modules/uiElement'
import UIElementManagement from './components/UIElementManagement.vue'
defineOptions({
  components: { UIElementManagement },
})
const { renderComponentsName } = useUiElementStore()
const componentsMap = {
  UIElement: UIElementManagement,
}
</script>

<style lang="less" scoped>
.page {
  padding: 5px;
}
</style>
