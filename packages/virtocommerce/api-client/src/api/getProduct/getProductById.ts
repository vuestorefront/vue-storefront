import { GetProductByIdQuery, Product, GetProductByIdQueryVariables } from '../../graphql/types';
import GetProductByIdQueryDocument from './getProductByIdQuery';
import { xApiClient } from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function (options: any): Promise<Product[]> {
  
  const { data } = await xApiClient.query<GetProductByIdQuery, GetProductByIdQueryVariables>({
    query: GetProductByIdQueryDocument,
    variables: {
      id: options.id,
      storeId: "Electronics",
      userId: "et",
      currencyCode: "USD",
      cultureName: "en-US"
    }
  });
  return [ data.product ];
}
