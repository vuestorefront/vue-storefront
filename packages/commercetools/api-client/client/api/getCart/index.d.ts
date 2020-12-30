import { CartQueryResponse } from '../../types/Api';
declare const getCart: ({ config, client }: {
    config: any;
    client: any;
}, cartId: string) => Promise<CartQueryResponse>;
export default getCart;
