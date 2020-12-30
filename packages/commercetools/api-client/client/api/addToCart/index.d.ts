import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
declare const addToCart: (settings: any, { id, version }: Cart, product: ProductVariant, quantity: number, customQuery?: CustomQueryFn) => Promise<CartResponse>;
export default addToCart;
