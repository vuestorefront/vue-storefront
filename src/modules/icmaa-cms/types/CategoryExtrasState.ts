export interface CategoryExtrasStateItem {
  identifier: string,
  content: string,
  language: string
}

export default interface CategoryExtrasState {
  items: CategoryExtrasStateItem[]
}
