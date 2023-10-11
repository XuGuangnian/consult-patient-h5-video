<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'

const value = ref('')
const onSearch = (val: string) => showToast(val)
const onCancel = () => showToast('取消')
</script>

<template>
  <div class="consult-choose-page">
    <cp-nav-bar title="选择药品"></cp-nav-bar>
    <van-search
      v-model="value"
      show-action
      placeholder="搜一搜: 药品名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-action-bar>
      <van-action-bar-icon icon="cart-o" badge="0" />
      <div class="total-price">￥ 1000</div>
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
