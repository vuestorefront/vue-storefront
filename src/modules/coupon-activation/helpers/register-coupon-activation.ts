import VueRouter from 'vue-router';
import { Store } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';
import i18n from '@vue-storefront/core/i18n';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';
import { IS_COUPON_INTERACTION_BLOCKED } from '@vue-storefront/core/modules/cart';
import { CART_SET_PENDING_COUPON, SN_CART } from '@vue-storefront/core/modules/cart/store/mutation-types';

import { CouponActivationResult } from '../types/coupon-activation-result';

type ApplyCoupon = (couponCode: string) => Promise<CouponActivationResult>;

const couponInteractionBlockedGetter = `${SN_CART}/${IS_COUPON_INTERACTION_BLOCKED}`;

function waitForSessionStart (store: Store<RootState>): Promise<void> {
  if (store.getters['user/getIsSessionStarted']) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const onSessionStarted = () => {
      EventBus.$off('session-after-started', onSessionStarted);
      resolve();
    };

    EventBus.$on('session-after-started', onSessionStarted);

    if (store.getters['user/getIsSessionStarted']) {
      onSessionStarted();
    }
  });
}

function notify (store: Store<RootState>, type: string, message: string): void {
  store.dispatch(
    'notification/spawnNotification',
    notifications.createNotification({
      type,
      message,
      timeToLive: 5 * 1000
    }),
    { root: true }
  );
}

function createCouponActivationAdapter (store: Store<RootState>): ApplyCoupon {
  const activateCoupon = async (couponCode: string): Promise<CouponActivationResult> => {
    if (
      typeof couponCode !== 'string' ||
      !couponCode ||
      store.getters[couponInteractionBlockedGetter]
    ) {
      return { status: 'rejected' };
    }

    const hasServerCart = Boolean(store.getters['cart/getCartToken']);
    const cartItems = store.getters['cart/getCartItems'];

    if (!hasServerCart || !cartItems.length) {
      store.commit(`${SN_CART}/${CART_SET_PENDING_COUPON}`, couponCode);
      notify(
        store,
        'success',
        i18n.t('Coupon saved. It will be applied automatically when you add items to your cart.').toString()
      );
      return { status: 'saved' };
    }

    const activeCoupon = store.getters['cart/getCoupon'];

    if (activeCoupon?.code === couponCode) {
      return { status: 'already-applied' };
    }

    if (activeCoupon) {
      notify(store, 'error', i18n.t('Another coupon is already applied.').toString());
      return { status: 'conflict' };
    }

    try {
      const task = await store.dispatch('cart/applyCoupon', { couponCode });

      if (!task || task.code !== 200) {
        return { status: 'rejected' };
      }

      notify(store, 'success', i18n.t('Coupon applied.').toString());
      return { status: 'applied' };
    } catch (error) {
      return { status: 'rejected' };
    }
  };

  return async (couponCode: string): Promise<CouponActivationResult> => {
    await waitForSessionStart(store);
    await store.dispatch('cart/waitForCartSync');
    return activateCoupon(couponCode);
  };
}

export function registerCouponActivation (store: Store<RootState>, router: VueRouter): void {
      const applyCoupon = createCouponActivationAdapter(store);
      const budsies = window.budsies || {};

      budsies.applyCoupon = applyCoupon;
      window.budsies = budsies;

      const couponCode = router.currentRoute.query.coupon_code;

      if (typeof couponCode !== 'string') {
        return;
      }

      void applyCoupon(couponCode);
}
