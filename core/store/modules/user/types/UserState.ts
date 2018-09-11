export default interface UserState {
  token: string,
  refreshToken: string,
  groupToken: string,
  groupId: any,
  current: {
    email: string
  } | null,
  current_storecode: string,
  session_started: Date,
  newsletter: any,
  orders_history: any
}
