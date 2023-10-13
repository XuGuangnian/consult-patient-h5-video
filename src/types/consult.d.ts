import type {
  AllergicHistory,
  ConsultType,
  FertilityStatus,
  IllnessTime,
  LiverFunction,
  OrderType,
  PositionalTitles,
  PriceRange,
  RenalFunction
} from '@/enums'
import type { Patient } from './user'
import type { Medical } from './room'

// 文章信息类型
export type Knowledge = {
  id: string
  /** 标题 */
  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 医生ID */
  creatorId: string
}

// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type PageParams = {
  current: number
  pageSize: number
}

// 文章列表查询参数
export type KnowledgeParams = PageParams & {
  type: KnowledgeType
}

// 药品列表查询参数
export type MedicineParams = PageParams & {
  keyword: string
}

/**
 * default_ascend 综合排序
 * score_ascend 评分
 * consultationNum_ascend 咨询量
 * serviceFee_ascend 价格
 */
export type DoctorOrderType =
  | 'default_ascend'
  | 'score_ascend'
  | 'consultationNum_ascend'
  | 'serviceFee_ascend'

export type DoctorParams = PageParams & {
  /** 省份id */
  provinceId: string
  /** 科室id */
  depId: string
  /** 排序 */
  order: DoctorOrderType
  /** 医院等级 */
  grade?: string
  /** 职称 */
  positionalTitles?: PositionalTitles
  /** 价格范围 */
  priceRange?: PriceRange
}

// 医生卡片对象
export type Doctor = {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

export type BasePage<T = any> = {
  pageTotal: number
  total: number
  rows: T
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = BasePage<DoctorList>

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = BasePage<KnowledgeList>

// 药品列表
export type MedicineList = Medical[]
// 药品列表带分页
export type MedicinePage = BasePage<MedicineList>

// 关注的目标类型：topic百科话题,knowledge百科文章,doc医生,disease疾病
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 图片列表
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}
// 问诊记录
export type Consult = {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
  /** 肝功能 */
  liverFunction: LiverFunction
  /** 肾功能 */
  renalFunction: RenalFunction
  /** 过敏史 */
  allergicHistory: AllergicHistory
  /** 生育状态及计划 */
  fertilityStatus: FertilityStatus
  /** 药品 */
  medicines: Medical[]
  /** 医生Id */
  docId: string
}

// Partial<T> 把一个对象的属性转换成可选
type PartialConsult = Partial<Consult>
// Required<T> 把一个对象的属性转换成必选
// type RequiredConsult = Required<PartialConsult>

// 二级科室
type SubDep = {
  id: string
  name: string
  avatar?: string
}
// 一级科室
type TopDep = SubDep & {
  child: SubDep[]
}

// 病情描述对象
type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

export type MedicineIllness = Pick<
  PartialConsult,
  | 'illnessDesc'
  | 'liverFunction'
  | 'renalFunction'
  | 'allergicHistory'
  | 'fertilityStatus'
  | 'pictures'
>

// 问诊订单预支付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单预支付信息
export type ConsultOrderPreData = {
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 优惠券ID */
  couponId: string
  /** 需付款 */
  payment: number
  /** 实付款 */
  actualPayment: number
}

// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: Doctor
  /** 患者信息 */
  patientInfo: Patient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}

export type ConsultOrderListParams = PageParams & {
  type: ConsultType
}

export type ConsultOrderPage = {
  total: number
  pageTotal: number
  rows: ConsultOrderItem[]
}

export type MedicineDetail = Medical & {
  /** 品牌 */
  brand: string
  brandId?: any
  /** 生产企业 */
  manufacturer: string
  /** 批准文号 */
  approvalNo: string
  /** 有效期 */
  expiration: string
  classify: string
  classifyId: string
  /** 功能主治 */
  indicationsFunction: string
  /** 禁忌 */
  contraindication: string
  /** 不良反应 */
  untowardReaction: string
  /** 注意事项 */
  preparation: string
  /** 执行标准 */
  standard: string
  creator: string
  updator: string
  createTime: string
  updateTime: string
  deleteState: number
  mainPictures: string[]
}

export type Area = {
  id: string
  parentId: string
  name: string
  citys?: City[]
}

export type City = {
  id: string
  parentId: string
  name: string
}
