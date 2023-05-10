import config from 'config'
import { Store } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import RootState from '@vue-storefront/core/types/RootState'
import Vue from 'vue';

import { UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID } from 'src/modules/shared/types/discount-price/events';
import UpdateProductDiscountPriceEventData from 'src/modules/shared/types/discount-price/update-product-discount-price-event-data.interface';

import { getBundleCartItemDiscountPrice, getBundleProductDefaultDiscountPrice } from './bundle-product-discount-price';

export default function initEventBusListeners (store: Store<RootState>, app: Vue) {
  EventBus.$on(UPDATE_CART_ITEM_DISCOUNT_PRICE_DATA_EVENT_ID, (productPriceData: UpdateProductDiscountPriceEventData) => {
    let discountedPrice;

    if (isBundleProduct(productPriceData.product)) {
      discountedPrice = getBundleCartItemDiscountPrice(productPriceData.product, store);
      productPriceData.value = discountedPrice;
      return;
    }

    discountedPrice = store.getters['promotionPlatform/getProductCampaignDiscountPrice'](
      productPriceData.product
    );

    productPriceData.value = discountedPrice;
  });

  EventBus.$on(UPDATE_PRODUCT_DEFAULT_DISCOUNT_PRICE_DATA_EVENT_ID, (productPriceData: UpdateProductDiscountPriceEventData) => {
    let discountedPrice;

    if (config.products.calculateBundlePriceByOptions && isBundleProduct(productPriceData.product)) {
      discountedPrice = getBundleProductDefaultDiscountPrice(productPriceData.product, store);
      productPriceData.value = discountedPrice;
      return;
    }

    discountedPrice = store.getters['promotionPlatform/getProductCampaignDiscountPrice'](
      productPriceData.product
    );

    productPriceData.value = discountedPrice;
  })

  EventBus.$on('before-execute-cart-create-task', (additionalParams: { [key: string]: string }) => {
    var campaignToken = store.getters['promotionPlatform/campaignToken']

    if (!campaignToken) {
      return
    }

    additionalParams['campaignToken'] = campaignToken
  })

  EventBus.$on('after-cart-recovery', (cartToken: string) => {
    store.dispatch('promotionPlatform/updateActiveCampaign', { dataParam: app.$route.query.data, cartId: cartToken });
  })
}
