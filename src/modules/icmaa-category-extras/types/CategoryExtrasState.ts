import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface CategoryExtrasStateItem extends AbstractStateItem {
  hasLogo: boolean,
  crossreferenceInLogoline: boolean,
  crossreferenceInProduct: boolean
}

export interface CategoryExtrasCategoryIdMapChildStateItem {
  id: number,
  url_key: string
}

export interface CategoryExtrasCategoryIdMapStateItem {
  parentId: number,
  children: CategoryExtrasCategoryIdMapChildStateItem[]
}

export interface CategoryExtrasDepartmentLogoStateItem {
  identifier: string,
  crossreferenceInLogoline: boolean,
  crossreferenceInProduct: boolean,
  customerCluster: string,
  genre: any[]
}

export default interface CategoryExtrasState {
  items: CategoryExtrasStateItem[],
  childCategoryIdMap: CategoryExtrasCategoryIdMapStateItem[],
  departmentLogos: CategoryExtrasDepartmentLogoStateItem[]
}
