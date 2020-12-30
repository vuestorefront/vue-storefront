import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
declare const removeCartCoupon: (context: any, cart: Cart, discountCode: ReferenceInput, customQuery?: CustomQueryFn) => Promise<CartResponse>;
export default removeCartCoupon;
