import BaseRequest from './BaseRequest'

interface ProductSearchParams extends BaseRequest {
  skus?: string[],
  locale?: string,
  catId?: number
}

export { ProductSearchParams }
