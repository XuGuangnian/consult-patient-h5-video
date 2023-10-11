<script setup lang="ts">
import { flagOptions, timeOptions } from '@/services/constants'
import { useConsultStore } from '@/stores'
import type { ConsultIllness } from '@/types/consult'
import { showConfirmDialog, showToast, type UploaderFileListItem } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Image } from '@/types/consult'

// 病情描述对象
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)

const store = useConsultStore()
const router = useRouter()
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined)
    return showToast('请选择症状的持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否就诊过')
  // 记录病情
  store.setIllness(form.value)
  // 跳转，携带标识
  router.push('/user/patient?isChange=1')
}

// 数据的回显
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复之前填写的病情信息？',
      closeOnPopstate: false
    }).then(() => {
      // 回显数据
      const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
      form.value = { illnessDesc, illnessTime, consultFlag, pictures }
      // fileList.value = pictures || []
      cpUploadRef.value.setFileList(pictures || [])
    })
  }
})
const cpUploadRef = ref()
const onUploadSuccess = (image: Image) => {
  form.value.pictures?.push(image)
}
const onDeleteSuccess = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== item.url
  )
}
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
      <!-- 上传组件 -->
      <cp-upload
        ref="cpUploadRef"
        @upload-success="onUploadSuccess"
        @delete-success="onDeleteSuccess"
      ></cp-upload>
      <!-- 下一步 -->
      <van-button
        @click="next"
        :class="{ disabled }"
        type="primary"
        block
        round
      >
        下一步
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}

.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
</style>
