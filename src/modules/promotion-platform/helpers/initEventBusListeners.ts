import Vue from 'vue';
import { Store } from 'vuex'

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import RootState from '@vue-storefront/core/types/RootState'

export default function initEventBusListeners (store: Store<RootState>, app: Vue) {
  EventBus.$on('before-execute-cart-create-task', (additionalParams: { [key: string]: string }) => {
    var campaignToken = store.getters['promotionPlatform/campaignToken']

    if (!campaignToken) {
      return
    }

    additionalParams['campaignToken'] = campaignToken
  });

  EventBus.$on('after-cart-recovery', (cartToken: string) => {
    store.dispatch('promotionPlatform/updateActiveCampaign', { dataParam: app.$route.query.data, cartId: cartToken });
  });
}
