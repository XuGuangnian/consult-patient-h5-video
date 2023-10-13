import type { ConsultType } from '@/enums'
import type {
  ConsultIllness,
  MedicineIllness,
  PartialConsult
} from '@/types/consult'
import type { Medical } from '@/types/room'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 问诊信息
    const consult = ref<PartialConsult>({})
    // 记录问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 记录问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 记录科室
    const setDep = (depId: string) => (consult.value.depId = depId)
    // 记录病情
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 记录患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 记录优惠券
    const setCoupon = (id: string) => (consult.value.couponId = id)

    const setMedicineIlness = (illness: MedicineIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.liverFunction = illness.liverFunction
      consult.value.renalFunction = illness.renalFunction
      consult.value.allergicHistory = illness.allergicHistory
      consult.value.fertilityStatus = illness.fertilityStatus
      consult.value.pictures = illness.pictures
    }

    const setMedicines = (val: Medical[]) => (consult.value.medicines = val)

    const setDocId = (val: string) => (consult.value.docId = val)

    // 清理数据
    const clear = () => (consult.value = {})
    return {
      consult,
      setType,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      setMedicineIlness,
      setMedicines,
      setDocId,
      clear
    }
  },
  {
    persist: true
  }
)
