<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DoctorList from './components/DoctorList.vue'
import type { DoctorOrderType } from '@/types/consult'

const route = useRoute()
const department = (route.query.department || '找医生') as string
const depId = route.params.depId as string

const menuRef = ref(null)
const itemRef = ref()
const switch1 = ref(false)
const switch2 = ref(false)
const order = ref<DoctorOrderType>('default_ascend')
const options = [
  { text: '综合排序', value: 'default_ascend' },
  { text: '评分', value: 'score_ascend' },
  { text: '咨询量', value: 'consultationNum_ascend' },
  { text: '价格', value: 'serviceFee_ascend' }
]
const onConfirm = () => {
  itemRef.value?.toggle()
  // 或者
  // menuRef.value.close();
}
</script>

<template>
  <div class="doctor-list-page">
    <cp-nav-bar :title="department"></cp-nav-bar>
    <div class="search">
      <cp-icon name="home-search" /> 搜一搜：医生/疾病名称
    </div>
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item title="区域"> 内容 </van-dropdown-item>
      <van-dropdown-item v-model="order" :options="options" />
      <van-dropdown-item title="筛选" ref="itemRef">
        <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" />
          </template>
        </van-cell>
        <van-cell center title="团购">
          <template #right-icon>
            <van-switch v-model="switch2" />
          </template>
        </van-cell>
        <div style="padding: 5px 16px">
          <van-button type="primary" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- 医生列表组件 -->
    <doctor-list :dep-id="depId" :order="order"></doctor-list>
  </div>
</template>

<style scoped lang="scss">
.doctor-list-page {
  padding-top: 46px;
  .search {
    box-sizing: border-box;
    margin-top: 10px;
    // border: 1px solid rgba(237, 237, 237, 0.9);
    height: 40px;
    border-radius: 20px;
    box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: var(--cp-dark);
    font-size: 13px;
    .cp-icon {
      font-size: 16px;
      margin-right: 5px;
    }
  }
  .van-dropdown-menu {
    position: sticky;
    top: 40px;
    z-index: 10;
    background-color: #fff;
  }
}
</style>
