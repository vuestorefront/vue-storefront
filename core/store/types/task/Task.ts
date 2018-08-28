export default interface Task {
  acknowledged: boolean
  callback_event: any
  code: number
  payload: any
  result: any
  resultCode: number
  silent: boolean
  task_id: number
  transmited: boolean
  transmited_at: Date
  url: string
}
