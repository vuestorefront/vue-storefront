import { CustomQueryFn, MeQueryInterface } from '../../index';
interface OrdersData {
    me: Pick<MeQueryInterface, 'orders'>;
}
declare const getOrders: ({ config, client }: {
    config: any;
    client: any;
}, params: any, customQueryFn?: CustomQueryFn) => Promise<import("apollo-client").ApolloQueryResult<OrdersData>>;
export default getOrders;
