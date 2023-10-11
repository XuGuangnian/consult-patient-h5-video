<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'

const value = ref('')
const onSearch = (val: string) => showToast(val)
const onCancel = () => showToast('取消')

const step = ref(0)
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
    <!-- 药品列表 -->
    <div class="medicine-list">
      <div class="item van-hairline--top" v-for="i in 20" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维生素E乳 {{ i }}</span>
            <span>
              <van-stepper
                v-model="step"
                min="0"
                :class="{ hide: step === 0 }"
              />
            </span>
          </p>
          <p class="size">
            <van-tag>处方药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
      </div>
    </div>
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
  .medicine-list {
    background-color: #fff;
    padding: 0 15px 45px;
    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .img {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 15px;
          margin-bottom: 5px;
          > span:first-child {
            // width: 200px;
            // width: 300px;
            width: 40vw;
          }
          > span:last-child {
            // width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--cp-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--cp-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
      }
      .hide {
        :deep() {
          .van-stepper__minus,
          .van-stepper__input {
            visibility: hidden;
          }
        }
      }
    }
  }
}
</style>
