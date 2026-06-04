import { ActionTree } from 'vuex';
import VueRouter from 'vue-router';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { Logger } from '@vue-storefront/core/lib/logger';
import RootState from '@vue-storefront/core/types/RootState';

import { DEFAULT_SOURCE, getTrafficAttributionDataFromRoute } from '../helpers/get-traffic-attribution-data-from-route.function';
import { TouchData, TrafficAttributionData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import { MODULE_NAME } from '../types/store-name';
import { REPORT_TRAFFIC_ATTRIBUTION, SYNCHRONIZE } from '../types/actions';
import { GET_FIRST_TOUCH, GET_LAST_TOUCH } from '../types/getters';
import {
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  MARK_FIRST_TOUCH_SENT,
  MARK_LAST_TOUCH_SENT
} from '../types/mutations';
import { FIRST_TOUCH, LAST_TOUCH } from '../types/local-storage-key';

async function sendAttribution (attribution: TrafficAttributionData): Promise<boolean> {
  const url = processURLAddress(
    `${config.budsies.endpoint}/carts/traffic-attributions?token={{token}}&cartId={{cartId}}`
  );

  const { resultCode } = await TaskQueue.execute({
    url,
    payload: {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ request: attribution })
    },
    silent: true
  });

  if (resultCode !== 200) {
    Logger.error('Error reporting traffic attribution', MODULE_NAME)();
    return false;
  }

  return true;
}

function isSameTouchAttribution (a: TrafficAttributionData, b: TrafficAttributionData): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const actions: ActionTree<TrafficAttributionState, RootState> = {
  async [SYNCHRONIZE] ({ commit, getters }, router: VueRouter): Promise<void> {
    const storage = StorageManager.get(MODULE_NAME);

    const [storedFirstTouch, storedLastTouch] = await Promise.all([
      storage.getItem(FIRST_TOUCH),
      storage.getItem(LAST_TOUCH)
    ]);

    if (storedFirstTouch) {
      commit(SET_FIRST_TOUCH, storedFirstTouch);
    }

    if (storedLastTouch) {
      commit(SET_LAST_TOUCH, storedLastTouch);
    }

    const attribution = getTrafficAttributionDataFromRoute(router.currentRoute);
    const currentFirstTouch: TouchData | null = getters[GET_FIRST_TOUCH];

    if (!currentFirstTouch) {
      const firstTouch: TouchData = { attribution: { ...attribution }, isSent: false };
      const lastTouch: TouchData = { attribution: { ...attribution }, isSent: false };

      commit(SET_FIRST_TOUCH, firstTouch);
      commit(SET_LAST_TOUCH, lastTouch);
      return;
    }

    if (attribution.utm_source === DEFAULT_SOURCE) {
      return;
    }

    const currentLastTouch: TouchData | null = getters[GET_LAST_TOUCH];
    const isNewAttribution = !currentLastTouch || !isSameTouchAttribution(currentLastTouch.attribution, attribution);

    if (isNewAttribution) {
      commit(SET_LAST_TOUCH, { attribution, isSent: false });
    }
  },
  async [REPORT_TRAFFIC_ATTRIBUTION] ({ commit, getters }): Promise<void> {
    const firstTouch: TouchData | null = getters[GET_FIRST_TOUCH];
    const lastTouch: TouchData | null = getters[GET_LAST_TOUCH];

    if (!firstTouch) {
      return;
    }

    if (!firstTouch.isSent) {
      const success = await sendAttribution(firstTouch.attribution);

      if (success) {
        commit(MARK_FIRST_TOUCH_SENT);
      }
    }

    if (
      lastTouch &&
      !lastTouch.isSent &&
      !isSameTouchAttribution(firstTouch.attribution, lastTouch.attribution)
    ) {
      const success = await sendAttribution(lastTouch.attribution);

      if (success) {
        commit(MARK_LAST_TOUCH_SENT);
      }
    }
  }
};
