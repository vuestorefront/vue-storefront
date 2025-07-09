export interface OrderItemAvailableAction {
  code: string,
  name: string,
  message: string,
  blocking_progress: boolean,
  url: string | null
}
