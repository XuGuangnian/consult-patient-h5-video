<script setup lang="ts">
import { useConsultStore } from '@/stores'
import type { Medical } from '@/types/room'
import { onMounted } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  item: Medical
}>()

const step = ref(0)

const consultStore = useConsultStore()
const onChange = (value: string, detail: { name: string }) => {
  const medicines = consultStore.consult.medicines || []
  const medicine = medicines?.find((item) => item.id === detail.name)
  if (medicine) {
    medicine.quantity = value
  } else {
    medicines.push({
      ...props.item,
      quantity: value
    })
  }
  consultStore.setMedicines(medicines)
}

onMounted(() => {
  const medicines = consultStore.consult.medicines || []
  const medicine = medicines.find((item) => item.id === props.item.id)
  if (medicine) {
    step.value = +medicine.quantity
  }
})
</script>

<template>
  <div class="item van-hairline--top">
    <img class="img" :src="item.avatar" alt="" />
    <div class="info">
      <p class="name">
        <span>{{ item.name }}</span>
        <span>
          <van-stepper
            :name="item.id"
            v-model="step"
            min="0"
            :class="{ hide: step === 0 }"
            @change="onChange"
          />
        </span>
      </p>
      <p class="size">
        <van-tag v-if="item.prescriptionFlag === 1">处方药</van-tag>
        <span>{{ item.specs }}</span>
      </p>
      <p class="price">￥{{ item.amount }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
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
</style>
