import type {
  Area,
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  Doctor,
  DoctorPage,
  DoctorParams,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  MedicineDetail,
  MedicinePage,
  MedicineParams,
  PageParams,
  PartialConsult,
  TopDep
} from '@/types/consult'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('home/page/doc', 'GET', params)

export const getDoctorDetail = (id: string) => {
  return request<Doctor>(`doc/detail`, 'GET', {
    docId: id
  })
}

export const getFindDoctorPage = (params: DoctorParams) => {
  return request<DoctorPage>('/patient/search/doc', 'GET', params)
}

export const getMedicinePage = (params: MedicineParams) => {
  return request<MedicinePage>('patient/medicine', 'GET', params)
}

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('like', 'POST', { id, type })

export const getAllDep = () => request<TopDep[]>('dep/all')

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('upload', 'POST', fd)
}

export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('patient/consult/order/pre', 'GET', params)

export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('patient/consult/order', 'POST', data)

export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('patient/consult/pay', 'POST', params)

export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('patient/consult/order/detail', 'GET', { orderId })

export const getPrescriptionPic = (id: string) =>
  request<{ url: string }>(`patient/consult/prescription/${id}`)

export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request('patient/order/evaluate', 'POST', data)

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('patient/consult/order/list', 'GET', params)

export const cancelOrder = (id: string) =>
  request(`patient/order/cancel/${id}`, 'PUT')

export const deleteOrder = (id: string) =>
  request(`patient/order/${id}`, 'DELETE')

export const getMedicineDetail = (id: string) => {
  return request<MedicineDetail>(`patient/medicine/${id}`)
}

export const getAllBasicArea = () => {
  return request<Area[]>('basicArea/all')
}
