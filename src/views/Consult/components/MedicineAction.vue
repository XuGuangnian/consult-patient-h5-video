<script setup lang="ts">
import MedicineCard from './MedicineCard.vue'
import { useConsultStore } from '@/stores'
import { showToast } from 'vant'
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    from?: 'list' | 'detail'
  }>(),
  {
    from: 'list'
  }
)

const consultStore = useConsultStore()
const selectedMedicines = computed(
  () =>
    consultStore.consult.medicines?.filter((item) => +item.quantity > 0) || []
)
const totalPrice = computed(() => {
  return selectedMedicines.value
    ?.reduce((sum, item) => {
      return (sum += +item.amount * +item.quantity)
    }, 0)
    .toFixed(2)
})
const cartLength = computed(() => selectedMedicines.value.length || 0)

const show = ref(false)
const openCart = () => {
  if (cartLength.value === 0) return showToast('请选择药品')
  show.value = true
}

const clear = () => {
  // console.log('clear')
  consultStore.setMedicines([])
  show.value = false
}

const onAskDocotor = () => {
  console.log('申请开方')
}

const onAddToCart = () => {
  console.log('加入药箱')
}
</script>

<template>
  <!-- 药品底部操作栏 -->
  <van-action-bar>
    <van-action-bar-icon
      icon="cart-o"
      :color="cartLength > 0 ? '#323233' : '#eee'"
      :badge="cartLength"
      @click="openCart"
    />
    <div class="total-price">￥ {{ totalPrice }}</div>
    <!-- 
      列表页 申请开放
      详情页 加入药箱
     -->
    <van-action-bar-button
      v-if="from === 'list'"
      type="primary"
      text="申请开方"
      @click="onAskDocotor"
    />
    <van-action-bar-button
      v-else
      type="primary"
      text="加入药箱"
      @click="onAddToCart"
    ></van-action-bar-button>
  </van-action-bar>
  <!-- 药品清单抽屉 -->
  <van-action-sheet v-model:show="show">
    <div class="content">
      <div class="content-header">
        <div class="content-header-left">
          <span>药品清单</span><span>共{{ cartLength }}件商品</span>
        </div>
        <div class="content-header-right" @click="clear">
          <van-icon name="delete-o" />
          <span>清空</span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="medicine-list">
        <medicine-card
          v-for="item in selectedMedicines"
          :key="item.id"
          :item="item"
        ></medicine-card>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon
        icon="cart-o"
        :color="cartLength > 0 ? '#323233' : '#eee'"
        :badge="cartLength"
      />
      <div class="total-price">￥ {{ totalPrice }}</div>
      <van-action-bar-button
        type="primary"
        text="申请开方"
        @click="onAskDocotor"
      />
    </van-action-bar>
  </van-action-sheet>
</template>

<style scoped lang="scss">
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
.content {
  --content-height: 400px;
  --content-header-height: 25px;
  padding: 16px;
  height: var(--content-height);
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--content-header-height);
    padding-bottom: 10px;
    &-left {
      span {
        font-size: 16px;
        color: #000000;
        margin-right: 10px;
      }
      span + span {
        font-size: 13px;
        color: var(--cp-primary);
      }
    }
    &-right {
      span {
        margin-left: 5px;
      }
    }
  }
  .medicine-list {
    padding-bottom: 45px;
  }
}
</style>
