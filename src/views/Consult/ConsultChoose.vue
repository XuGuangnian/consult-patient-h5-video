<script setup lang="ts">
import { computed, ref } from 'vue'
import MedicineList from './components/MedicineList.vue'
import { useConsultStore } from '@/stores'

const searchValue = ref('')
const keyword = ref('')
const onSearch = () => {
  keyword.value = searchValue.value
}
const onCancel = () => {
  keyword.value = ''
}

const consultStore = useConsultStore()
const totalPrice = computed(() => {
  return consultStore.consult.medicines
    ?.filter((item) => +item.quantity > 0)
    ?.reduce((sum, item) => {
      return (sum += +item.amount * +item.quantity)
    }, 0)
    .toFixed(2)
})
const cartLength = computed(
  () =>
    consultStore.consult.medicines?.filter((item) => +item.quantity > 0)
      .length || 0
)
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
    <van-action-bar>
      <van-action-bar-icon
        icon="cart-o"
        :color="cartLength > 0 ? '#323233' : '#eee'"
        :badge="cartLength"
      />
      <div class="total-price">￥ {{ totalPrice }}</div>
      <van-action-bar-button type="primary" text="申请开方" />
    </van-action-bar>
  </div>
</template>

<style scoped lang="scss">
.consult-choose-page {
  padding-top: 46px;
  .van-action-bar {
    border-top: 1px solid rgba(237, 237, 237, 0.9);
    .total-price {
      width: 200px;
      font-size: 24px;
      line-height: 18px;
      font-weight: 700;
      color: #121826;
    }
  }
}
</style>
