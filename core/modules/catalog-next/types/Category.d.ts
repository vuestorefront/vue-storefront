export interface ChildrenData {
  id: any,
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
  parent_id: any,
  name: string,
  id: any,
  url_path: string,
  url_key: string,
  children_data: ChildrenData[],
  slug: string
}
