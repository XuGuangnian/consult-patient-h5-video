<script setup lang="ts">
import { ref } from 'vue'
import MedicineList from './components/MedicineList.vue'
import MedicineAction from './components/MedicineAction.vue'

const searchValue = ref('')
const keyword = ref('')
const onSearch = () => {
  keyword.value = searchValue.value
}
const onCancel = () => {
  keyword.value = ''
}
</script>

<template>
  <div class="consult-choose-page">
    <cp-nav-bar title="选择药品"></cp-nav-bar>
    <van-search
      v-model="searchValue"
      show-action
      placeholder="搜一搜: 药品名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 药品列表 -->
    <medicine-list :keyword="keyword"></medicine-list>
    <!-- 药品底部操作 -->
    <medicine-action></medicine-action>
  </div>
</template>

<style scoped lang="scss">
.consult-choose-page {
  padding-top: 46px;
}
</style>
