import { OrderMyCartCommand } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { OrderMutationResponse } from '../../types/Api';
declare const createMyOrderFromCart: ({ config, client }: {
    config: any;
    client: any;
}, draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn) => Promise<OrderMutationResponse>;
export default createMyOrderFromCart;
