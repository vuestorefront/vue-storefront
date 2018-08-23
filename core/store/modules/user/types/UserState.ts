export default interface UserState {
  token: string,
  refreshToken: string,
  groupToken: string,
  groupId: null,
  current: {
    email: string
  } | null,
  current_storecode: string,
  session_started: Date,
  newsletter: null,
  orders_history: null
}
