import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, LineItem } from './../../types/GraphQL';
declare const removeFromCart: (context: any, cart: Cart, product: LineItem, customQuery?: CustomQueryFn) => Promise<CartResponse>;
export default removeFromCart;
