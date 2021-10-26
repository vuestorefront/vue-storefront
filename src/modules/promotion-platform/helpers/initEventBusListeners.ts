import { Store } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import RootState from '@vue-storefront/core/types/RootState'

import UpdateProductDiscountPriceDataEvent from 'theme/interfaces/update-product-discount-price-data-event.interface';

export default function initEventBusListeners (store: Store<RootState>) {
  EventBus.$on('updateProductDiscountPriceData', (updateProductDiscountPriceDataEvent: UpdateProductDiscountPriceDataEvent) => {
    updateProductDiscountPriceDataEvent.value =
     store.getters['promotionPlatform/getProductCampaignDiscountPrice'](
       updateProductDiscountPriceDataEvent.product
     );
  })
}
