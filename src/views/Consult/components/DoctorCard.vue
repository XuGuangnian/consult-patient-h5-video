<script setup lang="ts"></script>

<template>
  <div class="doctor-card">
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
</template>

<style scoped lang="scss">
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
</style>
