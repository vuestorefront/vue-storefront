import { getOption } from './../configuration'
import { ProductSearchParams } from './../types/Product'

const getProducts = async ({ skus = [], locale = '', catId = null }: ProductSearchParams) => {
  const connection = getOption('connection')

  try {
    const searchQuery = skus.join(',')
    const response = await connection.get(
      `/catalog/products?skus=${searchQuery}&locale=${locale}&catId=${catId || ''}`
    )
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default getProducts;
