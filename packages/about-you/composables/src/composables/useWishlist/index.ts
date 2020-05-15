import { WishlistItem, WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { BapiProduct } from '@aboutyou/backbone';
import { useWishlistFactory } from '@vue-storefront/core';
import { params } from './factoryParams';

const { useWishlist, setWishlist } = useWishlistFactory<WishlistResponseData, BapiProduct, WishlistItem>(params);
export {useWishlist, setWishlist};
