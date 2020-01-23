export default interface GoogleTagManagerState {
  key?: null|string,
  enabled: boolean,
  lastOrderId: string
}

export interface AttributeMapItem {
  field: string,
  name?: string,
  type?: string
}
