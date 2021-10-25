import { Store } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import RootState from '@vue-storefront/core/types/RootState'

import UpdateProductCampaignDiscountEvent from '../types/UpdateProductCampaignDiscountEvent.interface';

export default function initEventBusListeners (store: Store<RootState>) {
  EventBus.$on('updateProductCampaignDiscountData', (productCampaignDiscountData: UpdateProductCampaignDiscountEvent) => {
    productCampaignDiscountData.value = store.getters['promotionPlatform/getProductCampaignDiscount'](
      productCampaignDiscountData.product,
      productCampaignDiscountData.format
    );
  })
}
