export default interface UserState {
  token: string,
  refreshToken: string,
  groupToken: string,
  groupId: any,
  current: {
    email: string,
    addresses: any[],
    default_shipping: number,
    default_billing: number
  } | null,
  current_storecode: string,
  session_started: Date,
  orders_history: any,
  local_data_loaded: boolean
}
