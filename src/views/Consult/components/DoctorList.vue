<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
defineProps<{
  depId: string
}>()
</script>

<template>
  <div class="doctor-list">
    <doctor-card v-for="item in 10" :key="item"></doctor-card>
  </div>
</template>

<style scoped lang="scss">
.doctor-list {
  padding: 15px;
}
</style>
