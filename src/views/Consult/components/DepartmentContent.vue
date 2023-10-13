<script setup lang="ts">
import type { TopDep } from '@/types/consult'
import { ref } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  depts: TopDep[]
}>()

const showDepts = computed(() => props.depts[0]?.child || [])
const show = ref(false)
</script>

<template>
  <div class="department-content">
    <div class="department-header">
      <p class="title-text">按科室找医生</p>
      <p class="all-link" @click="show = true">
        全部科室
        <van-icon name="arrow" />
      </p>
    </div>
    <div class="department-list">
      <div
        class="department-item"
        @click="
          $router.push(`/doctorList/${item?.id}?department=${item?.name}`)
        "
        v-for="item in showDepts"
        :key="item.id"
      >
        <img :src="item.avatar" alt="" class="department-icon" /><span
          class="department-name"
          >{{ item.name }}</span
        >
      </div>
    </div>
  </div>
  <van-action-sheet v-model:show="show" title="全部科室">
    <div class="content">
      <div>
        <p class="department-header">内科</p>
        <div class="mb-20">
          <span class="department-text">心血管内科</span
          ><span class="department-text">普通内科</span
          ><span class="department-text">神经内科</span
          ><span class="department-text">消化内科</span
          ><span class="department-text">内分泌科</span
          ><span class="department-text">免疫科</span
          ><span class="department-text">高压氧科</span
          ><span class="department-text">血液科</span
          ><span class="department-text">肾病内科</span
          ><span class="department-text">呼吸科</span
          ><span class="department-text">感染内科</span
          ><span class="department-text">过敏反应科</span>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>

<style scoped lang="scss">
.department-content {
  .department-header {
    font-size: 16px;
    font-weight: 500;
    color: #121826;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .all-link {
      font-size: 13px;
      color: #c3c3c5;
      display: flex;
      align-items: center;
    }
  }
  .department-list {
    padding-top: 20px;
    background: #fafafa;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .department-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;
      .department-icon {
        --icon-size: 70px;
        display: inline-block;
        width: var(--icon-size);
        height: var(--icon-size);
      }
      .department-name {
        font-size: 12px;
        margin-top: 6px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #121826;
      }
    }
  }
}

.content {
  padding: 16px;
  height: 400px;
  .department-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #121826;
  }
  .mb-20 {
    margin-bottom: 20px;
    .department-text {
      display: inline-block;
      height: 33px;
      padding: 0 20px;
      background: #fafafa;
      border-radius: 27px;
      font-size: 13px;
      color: #3c3e42;
      line-height: 33px;
      text-align: center;
      margin-right: 9px;
      margin-bottom: 9px;
    }
  }
}
</style>
