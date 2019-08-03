export interface Notification {
  type: string,
  message: any,
  action1: any,
  action2?: any
}

export interface ServerResponse {
  status: string | number,
  sku: string,
  result: any
}

export interface Party {
  party: string,
  status: string,
  sku: string
}
