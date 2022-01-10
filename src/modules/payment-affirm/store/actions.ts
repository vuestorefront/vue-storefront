import { ActionTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { processURLAddress } from '@vue-storefront/core/helpers';
import config from 'config';

import PaymentAffirmState from '../types/PaymentAffirmState';
import { AffirmPaymentMethod, AFFIRM_METHOD_CODE } from '../types/AffirmPaymentMethod';

export const actions: ActionTree<PaymentAffirmState, RootState> = {
  async getCheckoutObject (): Promise<any> {
    let url = processURLAddress(`${config.budsies.endpoint}/affirm/get-checkout-object?token={{token}}&cartId={{cartId}}`);

    const task = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    return task.result;
  },
  async checkIsPaymentMethodAvailable ({ dispatch }): Promise<boolean> {
    let url = processURLAddress(`${config.budsies.endpoint}/affirm/is-payment-method-available?token={{token}}&cartId={{cartId}}`);

    const task = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (task.result) {
      dispatch('addAffirmToPaymentMethods');
    } else {
      dispatch('removeAffirmFromPaymentMethods');
    }

    return task.result;
  },
  async addAffirmToPaymentMethods ({ dispatch, rootGetters }): Promise<void> {
    const paymentMethods: any[] = rootGetters['checkout/getPaymentMethods'];
    const isAffirmAvailable = paymentMethods.find(
      (method) => method.code === AFFIRM_METHOD_CODE
    )

    if (isAffirmAvailable) {
      return;
    }

    await dispatch('checkout/addPaymentMethod', AffirmPaymentMethod, { root: true });
  },
  async removeAffirmFromPaymentMethods ({ dispatch, rootGetters }): Promise<void> {
    const paymentMethods: any[] = [...rootGetters['checkout/getPaymentMethods']];
    const affirmMethodIndex = paymentMethods.findIndex(
      (method) => method.code === AFFIRM_METHOD_CODE
    )

    if (affirmMethodIndex === -1) {
      return;
    }

    paymentMethods.splice(affirmMethodIndex, 1);
    dispatch('checkout/setPaymentMethods', paymentMethods, { root: true });
  }
}
