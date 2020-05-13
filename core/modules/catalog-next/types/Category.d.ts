import FilterVariant from './FilterVariant'

export interface ChildrenData {
  id: number | string,
  children_data?: ChildrenData[],
  name?: string,
  slug?: string,
  url_key?: string
}

export interface Category {
  path: string,
  is_active: boolean,
  level: number,
  product_count: number,
  children_count: string,
  parent_id: number | string,
  name: string,
  id: number | string,
  url_path: string,
  url_key: string,
  children_data: ChildrenData[],
  slug: string,
  position?: number
}

export interface Filters {
  [key: string]: FilterVariant[]
}
