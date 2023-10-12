<script setup lang="ts">
import MedicineAction from './components/MedicineAction.vue'
import { getMedicineDetail } from '@/services/consult'
import type { MedicineDetail } from '@/types/consult'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => route.params.id)
const detail = ref<MedicineDetail>()
onMounted(() => {
  loadDetail()
})
const loadDetail = async () => {
  const { data } = await getMedicineDetail(id.value as string)
  detail.value = data
}
</script>

<template>
  <div class="medicine-detail-page" v-if="detail">
    <cp-nav-bar :title="detail.name"></cp-nav-bar>
    <van-image :src="detail.avatar"></van-image>
    <medicine-action></medicine-action>
  </div>
</template>

<style scoped lang="scss">
.medicine-detail-page {
  padding-top: 46px;
}
</style>
