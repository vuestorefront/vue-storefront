import loadCurrentCart from './currentCart';
import { ProductVariant, LineItem } from './../types/GraphQL';
import { Cart, CartDetails } from '@vue-storefront/commercetools-api';
import { useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';

const getCartItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCartDetails = async <COMPLETE_DETAILS = ''>(context: Context, currentCart, completeDetails?: COMPLETE_DETAILS):
  Promise<COMPLETE_DETAILS extends boolean ? Cart : CartDetails> => {
  const cart = currentCart || await loadCurrentCart(context);

  return completeDetails ? cart : { id: cart.id, version: cart.version };
};

/**
 * @remarks References:
 * {@link CartDetails}, {@link LineItem}, {@link ProductVariant}
 */
const useCartFactoryParams: UseCartFactoryParams<CartDetails, LineItem, ProductVariant> = {
  load: async (context: Context, { customQuery }) => {
    const { $ct } = context;
    if (!$ct.config.auth.onTokenRead()) return null;

    const isGuest = await $ct.api.isGuest();

    if (isGuest) {
      return null;
    }

    const { data: profileData } = await context.$ct.api.getMe({ customer: false }, customQuery);

    return profileData.me.activeCart;
  },
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const params: {
      product: ProductVariant;
      quantity: number;
      supplyChannel?: string;
      distributionChannel?: string;
    } = {
      product,
      quantity
    };

    if (customQuery?.distributionChannel) params.distributionChannel = customQuery.distributionChannel;
    if (customQuery?.supplyChannel) params.supplyChannel = customQuery.supplyChannel;

    const { data } = await context.$ct.api.addToCart(cartDetails, params, customQuery);

    return data.cart;
  },
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.removeFromCart(cartDetails, product, customQuery);
    return data.cart;
  },
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.updateCartQuantity(cartDetails, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clear: async (context: Context, { currentCart }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.deleteCart(cartDetails);
    return data.cart;
  },
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.applyCartCoupon(cartDetails, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    const cartDetails = await getCurrentCartDetails<true>(context, currentCart, true);

    const couponId = cartDetails.discountCodes.find((d) => d.discountCode.code === couponCode)?.discountCode?.id;

    if (!couponId) {
      return { updatedCart: currentCart };
    }

    const { data } = await context.$ct.api.removeCartCoupon(cartDetails, { id: couponId, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isInCart: (context: Context, { currentCart, product }) => {
    return Boolean(currentCart && getCartItemByProduct({ currentCart, product }));
  }
};

/**
 * @remarks References:
 * {@link CartDetails}, {@link LineItem}, {@link ProductVariant}
 */
const useCart = useCartFactory<CartDetails, LineItem, ProductVariant>(useCartFactoryParams);

export {
  useCart,
  useCartFactoryParams
};
