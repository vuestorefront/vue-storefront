import { CategoryQueryResult } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
export interface CategoryData {
    categories: CategoryQueryResult;
}
declare const getCategory: (context: any, params: any, customQueryFn?: CustomQueryFn) => Promise<import("apollo-client").ApolloQueryResult<CategoryData>>;
export default getCategory;
