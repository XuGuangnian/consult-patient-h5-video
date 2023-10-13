// export {}

// 枚举：一组可选的常量
// 需求：0 1 2 3 上下左右

// enum Direction {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3
// }

// 值默认是从0开始以此类推
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// 如果给了一个默认的数字，一样的
// enum Direction {
//   Up = 5,
//   Down,
//   Left,
//   Right
// }

// 可以是字符串
// enum Direction {
//   Up = 'Up',
//   Down = 'Down',
//   Left = 'Left',
//   Right = 'Right'
// }

// const changeDirection = (direction: Direction) => {
//   console.log(direction)
// }

// changeDirection(Direction.Right)

// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}

// 问诊时间
export enum IllnessTime {
  Week = 1,
  Month,
  HalfYear,
  More
}

// 消息类型
export enum MsgType {
  /** 文字聊天 */
  MsgText = 1,
  /** 消息聊天 */
  MsgImage = 4,
  /** 患者信息 */
  CardPat = 21,
  /** 处方信息 */
  CardPre = 22,
  /** 未评价信息 */
  CardEvaForm = 23,
  /** 已评价信息 */
  CardEva = 24,
  /** 通用通知 */
  Notify = 31,
  /** 温馨提示 */
  NotifyTip = 32,
  /** 取消提示 */
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  /** 未付款 */
  NotPayment = 1,
  /** 已付款 */
  Payment = 2,
  /** 已失效 */
  Invalid = 3
}

export enum OrderType {
  // 问诊订单
  /** 待支付 */
  ConsultPay = 1,
  /** 待接诊 */
  ConsultWait = 2,
  /** 问诊中 */
  ConsultChat = 3,
  /** 问诊完成 */
  ConsultComplete = 4,
  /** 取消问诊 */
  ConsultCancel = 5,
  // 药品订单
  /** 待支付 */
  MedicinePay = 10,
  /** 待发货 */
  MedicineSend = 11,
  /** 待收货 */
  MedicineTake = 12,
  /** 已完成 */
  MedicineComplete = 13,
  /** 取消订单 */
  MedicineCancel = 14
}

export enum ExpressStatus {
  /** 已发货 */
  Delivered = 1,
  /** 已揽件 */
  Received = 2,
  /** 运输中 */
  Transit = 3,
  /** 派送中 */
  Delivery = 4,
  /** 已签收 */
  Signed = 5
}

// 肝功能
export enum LiverFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 肾功能
export enum RenalFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 过敏史
export enum AllergicHistory {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 生育状态及计划
export enum FertilityStatus {
  /** 无 */
  No,
  /** 备孕中 */
  TryingToConceive,
  /** 已怀孕 */
  AlreadyPregnant,
  /** 哺乳期 */
  Breastfeeding
}

export enum PositionalTitles {
  /** 主任医师 */
  ChiefPhysician,
  /** 副主任医师 */
  AssociateChiefPhysician,
  /** 主治医师 */
  AttendingPhysician,
  /** 医师 */
  Physician
}

export enum PriceRange {
  /** 价格区间 0-19 */
  ZeroToNineteen = '0_19',
  /** 价格区间 20-49 */
  TwentyToFortyNine = '20_49',
  /** 价格区间 50-79 */
  FiftyToSeventyNine = '50_79',
  /** 价格区间 80以上 */
  MoreThanEighty = '80'
}
