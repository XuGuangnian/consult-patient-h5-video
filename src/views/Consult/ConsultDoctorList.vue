<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DoctorList from './components/DoctorList.vue'
import type { Area, DoctorOrderType } from '@/types/consult'
import { onMounted } from 'vue'
import { getAllBasicArea } from '@/services/consult'
import {
  gradeOptions,
  positionalTitlesOptions,
  priceRangeOptions
} from '@/services/constants'
import type { PositionalTitles, PriceRange } from '@/enums'

const route = useRoute()
const department = (route.query.department || '找医生') as string
const depId = route.params.depId as string

const menuRef = ref(null)
const itemRef = ref()
const order = ref<DoctorOrderType>('default_ascend')
const options = [
  { text: '综合排序', value: 'default_ascend' },
  { text: '评分', value: 'score_ascend' },
  { text: '咨询量', value: 'consultationNum_ascend' },
  { text: '价格', value: 'serviceFee_ascend' }
]

const grade = ref<string>()
const positionalTitles = ref<PositionalTitles>()
const priceRange = ref<PriceRange>()
const onConfirm = () => {
  grade.value = form.value.grade
  positionalTitles.value = form.value.positionalTitles
  priceRange.value = form.value.priceRange
  itemRef.value?.toggle()
  // 或者
  // menuRef.value.close()
}

const onReset = () => {
  // console.log('onReset')
  form.value = { ...initForm }
}

const provinceId = ref('100000')
const active = ref(0)
const areas = ref<Area[]>([])
onMounted(async () => {
  const { data } = await getAllBasicArea()
  areas.value = [
    {
      id: '100000',
      parentId: '',
      name: '全部'
    },
    ...data
  ]
})
const citys = computed(() => {
  const parent = areas.value[active.value]
  const result = parent?.citys || []
  return [
    {
      id: parent.id,
      parentId: parent.parentId,
      name: '全部'
    },
    ...result
  ]
})
const selectCity = (id: string) => {
  // console.log(id)
  provinceId.value = id
}

type FindDoctorForm = {
  grade?: string
  positionalTitles?: PositionalTitles
  priceRange?: PriceRange
}

const initForm: FindDoctorForm = {
  grade: undefined,
  positionalTitles: undefined,
  priceRange: undefined
}

const form = ref<FindDoctorForm>({ ...initForm })
</script>

<template>
  <div class="doctor-list-page">
    <cp-nav-bar :title="department"></cp-nav-bar>
    <div class="search">
      <cp-icon name="home-search" /> 搜一搜：医生/疾病名称
    </div>
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item title="区域">
        <div class="wrapper">
          <van-sidebar v-model="active">
            <van-sidebar-item
              :title="item.name"
              v-for="item in areas"
              :key="item.id"
            />
          </van-sidebar>
          <div class="sub">
            <span
              v-for="city in citys"
              :key="city.id"
              @click="selectCity(city.id)"
            >
              <span>{{ city.name }}</span>
              <van-icon name="success" v-if="city.id === provinceId" />
            </span>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item v-model="order" :options="options" />
      <van-dropdown-item title="筛选" ref="itemRef">
        <div class="find-doctor-form">
          <div class="item">
            <p>医院等级</p>
            <cp-radio-btn
              :options="gradeOptions"
              v-model="form.grade"
            ></cp-radio-btn>
          </div>
          <div class="item">
            <p>医生职称</p>
            <cp-radio-btn
              :options="positionalTitlesOptions"
              v-model="form.positionalTitles"
            ></cp-radio-btn>
          </div>
          <div class="item">
            <p>价格区间</p>
            <cp-radio-btn
              :options="priceRangeOptions"
              v-model="form.priceRange"
            ></cp-radio-btn>
          </div>
          <van-button round @click="onReset" class="reset-btn">重置</van-button>
          <van-button
            round
            type="primary"
            @click="onConfirm"
            class="confirm-btn"
            >确认</van-button
          >
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- 医生列表组件 -->
    <doctor-list
      :dep-id="depId"
      :order="order"
      :province-id="provinceId"
      :grade="grade"
      :positional-titles="positionalTitles"
      :price-range="priceRange"
    ></doctor-list>
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

  .van-sidebar {
    width: 114px;
    &-item {
      padding: 14px;
      color: var(--cp-tag);
      &--select {
        color: var(--cp-main);
        font-weight: normal;
        &::before {
          display: none;
        }
      }
    }
  }

  .wrapper {
    // height: calc(100vh - 46px);
    height: 400px;
    overflow: hidden;
    display: flex;
    .sub {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > span {
        display: flex;
        justify-content: space-between;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }

  .find-doctor-form {
    padding-left: 15px;
    padding-bottom: 15px;
    .item {
      padding: 15px 0;
      p {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        color: #848484;
        margin-bottom: 10px;
      }
    }
    .reset-btn {
      width: 125px;
      margin-right: 15px;
    }
    .confirm-btn {
      width: 205px;
    }
  }
}
</style>
