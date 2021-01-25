import { Product, GetProductByIdQuery, GetProductByIdQueryVariables } from '../../graphql/types';
import  searchProducts from "../searchProducts";
import getProductByIdQueryDocument from './getProductByIdQuery';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
 async function getProductById({ config, client }, options: any): Promise<Product[]> {
  
  const {store, getUserId, currency, locale } = config;
  const { data } = await client.query({
    query: getProductByIdQueryDocument,
    variables: {
      id: options.id,
      storeId: store,
      userId: getUserId(),
      currencyCode: currency,
      cultureName: locale
    }
  });
  return [ data.product ];
}


async function getProduct({ config, client }, options: GetProductByIdQueryVariables): Promise<any> {
  if (options.id) {
    const data = await getProductById({ config, client }, options);
    const total = data.length;
    return { data, total };
  } else {
    return await searchProducts({ config, client }, options);
  }
}

export default getProduct;

