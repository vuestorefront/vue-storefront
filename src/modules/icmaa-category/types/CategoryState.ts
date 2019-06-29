export default interface CategoryState {
  lists: CategoryStateListItem[]
}

export interface CategoryStateListItem {
  parent: CategoryStateCategory,
  list: CategoryStateCategory[]
}

export interface CategoryStateCategory {
  id: number,
  parent_id: number,
  name: string,
  path: string,
  children_count: number,
  url_path: string,
  url_key: string,
  slug: string,
  level: number,
  is_active: boolean
}
