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

export interface CategoryExtrasContentHeader {
  [identifier: string]: CategoryExtrasContentHeaderContent[]
}

export interface CategoryExtrasContentHeaderContent {
  _uid: string,
  component: string,
  [key: string]: any
}

export default interface CategoryExtrasState {
  childCategoryIdMap: CategoryExtrasCategoryIdMapStateItem[],
  categoryContentHeader: CategoryExtrasContentHeader
}
