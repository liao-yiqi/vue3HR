import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUiElementStore = defineStore(
  'ElementStore',
  () => {
    const uiElementState = ref(null)
    const setUiElementState = (val) => (uiElementState.value = val)
    const renderComponentsName = ref(null)
    const setComponentsName = (val) => (renderComponentsName.value = val)
    const platformDict = { 1: 'Web', 2: 'iOS', 3: 'Android' }
    return {
      uiElementState,
      setUiElementState,
      renderComponentsName,
      setComponentsName,
      platformDict,
    }
  },
  { persist: { key: 'UiElementState' } }
)

export default useUiElementStore
