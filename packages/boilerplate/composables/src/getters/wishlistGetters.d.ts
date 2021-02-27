import { WishlistGetters, AgnosticPrice, AgnosticTotals } from '@vue-storefront/core';
import { Wishlist, WishlistProduct } from '../types';
export declare const getWishlistItems: (wishlist: Wishlist) => WishlistProduct[];
export declare const getWishlistItemName: (product: any) => string;
export declare const getWishlistItemImage: (product: any) => string;
export declare const getWishlistItemPrice: (product: any) => AgnosticPrice;
export declare const getWishlistItemQty: (product: WishlistProduct) => number;
export declare const getWishlistItemAttributes: (product: WishlistProduct, filterByAttributeName?: string[]) => {
    color: string;
};
export declare const getWishlistItemSku: (product: any) => string;
export declare const getWishlistTotals: (wishlist: Wishlist) => AgnosticTotals;
export declare const getWishlistShippingPrice: (wishlist: Wishlist) => number;
export declare const getWishlistTotalItems: (wishlist: Wishlist) => number;
export declare const getFormattedPrice: (price: number) => string;
declare const wishlistGetters: WishlistGetters<Wishlist, WishlistProduct>;
export default wishlistGetters;
