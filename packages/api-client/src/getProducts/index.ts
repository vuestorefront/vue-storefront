import { getOption } from './../configuration'

const getProducts = async ({ skus, locale = '' }: { skus: string[], locale?: string }) => {
  const connection = getOption('connection')

  try {
    const searchQuery = skus.join(',')
    const response = await connection.get(
      `/catalog/products?skus=${searchQuery}&locale=${locale}`
    )
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default getProducts;
