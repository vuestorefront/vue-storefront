export default interface Task {
  acknowledged: boolean,
  callback_event: string,
  code: number,
  payload: any,
  result: any,
  resultCode: number,
  silent: boolean,
  task_id: number,
  transmited: boolean,
  transmited_at: Date,
  url: string,
  is_result_cacheable?: boolean,
  meta: any
}
