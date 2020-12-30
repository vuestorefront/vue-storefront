import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
declare const applyCartCoupon: (settings: any, cart: Cart, discountCode: string, customQuery?: CustomQueryFn) => Promise<CartResponse>;
export default applyCartCoupon;
