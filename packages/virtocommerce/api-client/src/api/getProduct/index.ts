import { Product, GetProductByIdQuery, GetProductByIdQueryVariables } from '../../graphql/types';
import  searchProducts from "../searchProducts";
import getProductByIdQueryDocument from './getProductByIdQuery';

import { xApiClient, getSettings } from '../../index';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
 async function getProductById(options: any): Promise<Product[]> {
  
  const {store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.query<GetProductByIdQuery, GetProductByIdQueryVariables>({
    query: getProductByIdQueryDocument,
    variables: {
      id: options.id,
      storeId: store,
      userId: userId,
      currencyCode: currency,
      cultureName: locale
    }
  });
  return [ data.product ];
}


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

