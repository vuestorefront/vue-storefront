import { CustomQueryFn } from '../../index';
import { ShippingMethod } from '../../types/GraphQL';
export interface ShippingMethodData {
    shippingMethods: ShippingMethod[];
}
declare const getShippingMethods: ({ config, client }: {
    config: any;
    client: any;
}, cartId?: string, customQueryFn?: CustomQueryFn) => Promise<import("apollo-client").ApolloQueryResult<ShippingMethodData>>;
export default getShippingMethods;
