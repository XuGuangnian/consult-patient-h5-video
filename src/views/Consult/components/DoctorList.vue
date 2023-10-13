<script setup lang="ts">
import { ref } from 'vue'
import DoctorCard from './DoctorCard.vue'
import type { DoctorList, DoctorParams } from '@/types/consult'
import { getFindDoctorPage } from '@/services/consult'
const props = defineProps<{
  depId: string
}>()
const list = ref<DoctorList>([])
const loading = ref(false)
const finished = ref(false)

const params = ref<DoctorParams>({
  current: 1,
  pageSize: 10,
  //   provinceId: '0',
  depId: props.depId,
  order: 'default_ascend'
})

const onLoad = async () => {
  const { data } = await getFindDoctorPage(params.value)
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
  <div class="doctor-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <doctor-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></doctor-card>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.doctor-list {
  padding: 15px;
}
</style>
