export interface CategoryExtrasStateItem {
  identifier: string,
  content: string,
  language: string,
  has_logo: boolean,
  crossreference_in_logoline: boolean,
  crossreference_in_product: boolean
}

export default interface CategoryExtrasState {
  items: CategoryExtrasStateItem[]
}
