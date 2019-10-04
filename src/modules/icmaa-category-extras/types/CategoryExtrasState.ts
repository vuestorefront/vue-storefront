export interface CategoryExtrasStateItem {
  identifier: string,
  content: string,
  language: string,
  has_logo: boolean,
  crossreference_in_logoline: boolean,
  crossreference_in_product: boolean
}

export interface CategoryExtrasCategoryIdMapStateItem {
  [parentId: string]: number[]
}

export default interface CategoryExtrasState {
  items: CategoryExtrasStateItem[],
  departmentChildCategoryIdMap: CategoryExtrasCategoryIdMapStateItem
}
