import { apiClient } from './../index'
import { ProductSearchParams, ProductResponse } from './../types/Product'

const getProducts = async ({ skus = [], catId = null }: ProductSearchParams): Promise<ProductResponse[]> => {
  try {
    const searchQuery = skus.join(',')
    const response = await apiClient.conn.get(
      // TODO: use body instead of search params
      `/catalog/products?skus=${searchQuery}&locale=${apiClient.config.locale}&catId=${catId || ''}`
    )
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default getProducts;
