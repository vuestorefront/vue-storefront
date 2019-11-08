export interface CategoryExtras {
  hasLogo: boolean,
  logoline: boolean,
  product_logoline: boolean,
  [key: string]: any
}

export interface CategoryExtrasCategoryIdMapChildStateItem {
  id: number,
  url_key: string
}

export interface CategoryExtrasCategoryIdMapStateItem {
  parentId: number,
  children: CategoryExtrasCategoryIdMapChildStateItem[]
}

export default interface CategoryExtrasState {
  childCategoryIdMap: CategoryExtrasCategoryIdMapStateItem[]
}
