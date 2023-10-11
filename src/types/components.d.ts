import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
import CpUpload from '@/components/CpUpload.vue'

declare module 'vue' {
  interface GlobalComponents {
    // 添加组件类型
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
    CpPaySheet: typeof CpPaySheet
    CpUpload: typeof CpUpload
  }
}
