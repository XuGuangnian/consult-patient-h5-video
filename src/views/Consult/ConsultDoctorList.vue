<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const department = route.query.department as string
// const deptId = route.params.deptId

const menuRef = ref(null)
const itemRef = ref()
const value = ref(0)
const switch1 = ref(false)
const switch2 = ref(false)
const options = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
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
      <van-dropdown-item v-model="value" :options="options" />
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

    <div class="doctor-list">
      <div class="doctor-card" v-for="item in 10" :key="item">
        <img
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/consult/deafaultAvatar.jpg"
          class="avator"
          alt=""
        />
        <div class="detail">
          <p>
            <span class="doctor-name">张医生</span
            ><span class="doctor-other-info">消化内科 | 主治医师</span>
          </p>
          <p class="hospital-info">
            <span class="hospital-grade">三级甲等</span
            ><span class="hospital-name">中国医学科学院北京协和医院</span>
          </p>
          <p class="skill-list">高血压，心脏病</p>
          <p class="record-list">
            <van-icon name="star" color="#fea116" />
            <span class="score">5.0</span><span> / 接诊数 </span
            ><span class="count">0</span>
          </p>
          <p class="bottom-content">
            <span class="price">¥49</span><span class="btn">问医生</span>
          </p>
        </div>
      </div>
    </div>
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

  .doctor-list {
    padding: 15px;
    .doctor-card {
      display: flex;
      flex-direction: row;
      padding: 20px 0;
      position: relative;
      .avator {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: middle;
        border-style: none;
      }
      .detail {
        flex: 1 1;
        .doctor-name {
          font-size: 18px;
          font-weight: 500;
          color: #3c3e42;
          margin-right: 7.5px;
        }
        .doctor-other-info {
          font-size: 12px;
          color: #6f6f6f;
        }
        .hospital-info {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          .hospital-grade {
            display: inline-block;
            width: 26px;
            height: 14px;
            background: #677fff;
            border-radius: 2px;
            font-size: 9px;
            color: #ffffff;
            line-height: 14px;
            text-align: center;
            margin-right: 3px;
          }
          .hospital-name {
            font-size: 12px;
            color: #3c3e42;
          }
        }
        .skill-list {
          font-size: 12px;
          color: #6f6f6f;
          margin-bottom: 10px;
        }
        .record-list {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #979797;
          .score,
          .count {
            font-size: 12px;
            font-family: Avenir, Avenir-Book;
            color: #fea116;
          }
        }
        .bottom-content {
          margin-top: 11px;
          padding-right: 11px;
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 18px;
            font-family: DIN Alternate, DIN Alternate-Bold;
            font-weight: 700;
            color: #2cb5a5;
          }
          .btn {
            display: inline-block;
            width: 70px;
            height: 29px;
            background: rgba(44, 181, 165, 0.1);
            border-radius: 27px;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            color: #2cb5a5;
            line-height: 29px;
            text-align: center;
          }
        }
      }
      :after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid rgba(237, 237, 237, 0.9);
        width: 200%;
        transform: scale(0.5);
        transform-origin: left top;
      }
    }
  }
}
</style>
