import BaseRequest from './BaseRequest'

interface CategorySearchParams extends BaseRequest {
  parentId?: number,
  level?: number,
  key?:string,
  value?: string[],
  onlyActive?: boolean,
  onlyNotEmpty?: boolean,
}

export { CategorySearchParams }
