export interface UrlRewrite {
  id: number,
  storeId: number,
  idPath: string,
  request_path: string,
  target_path: string,
  is_system: boolean,
  rewrite_options?: string,
  description?: string,
  category_id?: number,
  product_id?: number
}
