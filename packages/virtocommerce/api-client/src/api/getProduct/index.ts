import { Product, GetProductByIdQueryVariables } from '../../graphql/types';
import getProductById from './getProductById';
import searchProducts from './searchProducts';


async function getProduct(options: GetProductByIdQueryVariables): Promise<any> {
  if (options.id) {
    const data = await getProductById(options);
    const total = data.length;
    return { data, total };
  } else {
    return await searchProducts(options);
  }
}

export default getProduct;

