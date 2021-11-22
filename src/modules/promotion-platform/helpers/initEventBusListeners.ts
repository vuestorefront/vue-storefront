import config from 'config'
import { Store } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { isBundleProduct } from '@vue-storefront/core/modules/catalog/helpers';
import RootState from '@vue-storefront/core/types/RootState'
import queryString from 'query-string'

import UpdateProductDiscountPriceEventData, { UPDATE_PRODUCT_DISCOUNT_PRICE_DATA_EVENT_ID } from 'src/modules/shared/types/update-product-discount-price.event';

import getBundleProductDiscountPrice from './bundle-product-discount-price';

export default function initEventBusListeners (store: Store<RootState>) {
  EventBus.$on(UPDATE_PRODUCT_DISCOUNT_PRICE_DATA_EVENT_ID, (productPriceData: UpdateProductDiscountPriceEventData) => {
    let discountedPrice;

    if (config.products.calculateBundlePriceByOptions && isBundleProduct(productPriceData.product)) {
      discountedPrice = getBundleProductDiscountPrice(productPriceData.product, store);
      productPriceData.value = discountedPrice;
      return;
    }

    discountedPrice = store.getters['promotionPlatform/getProductCampaignDiscountPrice'](
      productPriceData.product
    );

    productPriceData.value = discountedPrice;
  })

  EventBus.$on('before_execute_cart_create_task', (data: { url: string }) => {
    var campaignToken = store.getters['promotionPlatform/campaignToken']

    if (!campaignToken) {
      return
    }

    let parsedUrl = queryString.parseUrl(data.url)

    parsedUrl['query']['campaignToken'] = campaignToken

    data.url = queryString.stringifyUrl(parsedUrl, { strict: false, encode: false })
  })
}
