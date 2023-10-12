<script setup lang="ts">
import { ref } from 'vue'
import MedicineCard from './MedicineCard.vue'
import type { MedicineList, MedicineParams } from '@/types/consult'
import { getMedicinePage } from '@/services/consult'
const list = ref<MedicineList>([])
const loading = ref(false)
const finished = ref(false)

const params = ref<MedicineParams>({
  keyword: '',
  pageSize: 10,
  current: 1
})

const onLoad = async () => {
  const { data } = await getMedicinePage(params.value)
  list.value.push(...data.rows)
  loading.value = false
  if (params.value.current >= data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
}
</script>

<template>
  <div class="medicine-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <medicine-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></medicine-card>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.medicine-list {
  background-color: #fff;
  padding: 0 15px 45px;
}
</style>
