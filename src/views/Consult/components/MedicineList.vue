<script setup lang="ts">
import MedicineCard from './MedicineCard.vue'
</script>

<template>
  <div class="medicine-list">
    <medicine-card v-for="i in 100" :key="i"></medicine-card>
  </div>
</template>

<style scoped lang="scss">
.medicine-list {
  background-color: #fff;
  padding: 0 15px 45px;
}
</style>
