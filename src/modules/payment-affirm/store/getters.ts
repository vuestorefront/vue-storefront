import { GetterTree } from 'vuex';

import PaymentAffirmState from '../types/PaymentAffirmState';

export const getters: GetterTree<PaymentAffirmState, any> = {
  getCheckoutToken: (state) => state.checkoutToken
}
