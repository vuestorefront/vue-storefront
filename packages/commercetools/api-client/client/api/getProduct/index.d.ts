import { CustomQueryFn } from '../../index';
import { ProductQueryResult } from '../../types/GraphQL';
export interface ProductData {
    products: ProductQueryResult;
}
declare const getProduct: (context: any, params: any, customQueryFn?: CustomQueryFn) => Promise<import("apollo-client").ApolloQueryResult<ProductData>>;
export default getProduct;
