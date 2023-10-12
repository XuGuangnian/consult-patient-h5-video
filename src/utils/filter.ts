import type {
  AllergicHistory,
  FertilityStatus,
  IllnessTime,
  LiverFunction,
  RenalFunction
} from '@/enums'
import {
  flagOptions,
  timeOptions,
  liverFunctionOptions,
  allergicHistoryOptions,
  fertilityStatusOptions,
  renalFunctionOptions
} from '@/services/constants'

// 获取患病时间
export const getIllnessTimeText = (time: IllnessTime) =>
  timeOptions.find((item) => item.value === time)?.label
// 获取是否就诊
export const getConsultFlagText = (flag: 0 | 1) =>
  flagOptions.find((item) => item.value === flag)?.label

export const getLiverFunctionText = (val: LiverFunction) => {
  return liverFunctionOptions.find((item) => item.value === val)?.label
}

export const getAllergicHistoryText = (val: AllergicHistory) => {
  return allergicHistoryOptions.find((item) => item.value === val)?.label
}

export const getFertilityStatusText = (val: FertilityStatus) => {
  return fertilityStatusOptions.find((item) => item.value === val)?.label
}

export const getRenalFunctionText = (val: RenalFunction) => {
  return renalFunctionOptions.find((item) => item.value === val)?.label
}
