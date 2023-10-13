<script setup lang="ts">
import { ref, watch } from 'vue'
import DoctorCard from './DoctorCard.vue'
import type { DoctorList, DoctorOrderType, DoctorParams } from '@/types/consult'
import { getFindDoctorPage } from '@/services/consult'
const props = defineProps<{
  depId: string
  order?: DoctorOrderType
}>()
const list = ref<DoctorList>([])
const loading = ref(false)
const finished = ref(false)

const params = ref<DoctorParams>({
  current: 1,
  pageSize: 10,
  provinceId: '0',
  depId: props.depId,
  order: props.order || 'default_ascend'
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

watch(
  () => props.order,
  (val) => {
    // console.log(val)
    list.value = []
    loading.value = false
    finished.value = false
    params.value.order = val || 'default_ascend'
    params.value.current = 1
    // onLoad()
  }
)
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
