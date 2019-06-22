export interface ChildrenData {
  id: number
}

export interface Category {
  path: string,
  is_active: boolean,
  level: number,
  product_count: number,
  children_count: string,
  parent_id: number,
  name: string,
  id: number,
  url_path: string,
  url_key: string,
  children_data: ChildrenData[]
}
