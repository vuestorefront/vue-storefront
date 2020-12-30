import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, Address } from '../../types/GraphQL';
declare const updateShippingDetails: (context: any, cart: Cart, shippingDetails: Address, customQueryFn?: CustomQueryFn) => Promise<CartResponse>;
export default updateShippingDetails;
