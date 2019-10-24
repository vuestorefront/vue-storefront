
interface CategorySearchParams {
  parentId?: number,
  level?: number,
  key?:string,
  value?: string[],
  onlyActive?: boolean,
  onlyNotEmpty?: boolean,
}

interface CategoryResponse {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
  url_key: string,
  slug: string,
  url_path: string,
  tsk: number,
  parent_id: number,
  is_active: boolean,
  position: number,
  level: number,
  product_count: number,
  children_data: any[],
  children: string,
  path: string,
  available_sort_by: any[],
  include_in_menu: boolean,
  is_anchor: string,
  children_count: string
}

export { CategorySearchParams, CategoryResponse }
