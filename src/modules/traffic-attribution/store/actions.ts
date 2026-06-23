import { ActionTree, Commit } from 'vuex';
import VueRouter from 'vue-router';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';
import { Logger } from '@vue-storefront/core/lib/logger';
import RootState from '@vue-storefront/core/types/RootState';

import {
  getTrafficAttributionDataFromRoute,
  hasTrafficAttributionAcquisitionSignal,
  isSameTouchAttribution
} from '../helpers/get-traffic-attribution-data-from-route.function';
import { TouchData, TrafficAttributionData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import { MODULE_NAME } from '../types/store-name';
import { REPORT_TRAFFIC_ATTRIBUTION, SYNCHRONIZE } from '../types/actions';
import { GET_FIRST_TOUCH, GET_LAST_TOUCH } from '../types/getters';
import {
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  MARK_FIRST_TOUCH_SENT,
  MARK_LAST_TOUCH_SENT,
  CLEAR_FIRST_TOUCH,
  CLEAR_LAST_TOUCH
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

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const DEFAULT_FIRST_TOUCH_EXPIRATION_DAYS = 90;
const DEFAULT_LAST_TOUCH_EXPIRATION_DAYS = 30;

function getExpirationDays (days: any, defaultDays: number): number {
  const normalizedDays = Number(days);

  if (normalizedDays > 0) {
    return normalizedDays;
  }

  return defaultDays;
}

function createTouchData (attribution: TrafficAttributionData, expirationDays: number): TouchData {
  const createdAt = Date.now();

  return {
    attribution: { ...attribution },
    isSent: false,
    createdAt,
    expiresAt: createdAt + expirationDays * DAY_IN_MILLISECONDS
  };
}

function createFirstTouchData (attribution: TrafficAttributionData): TouchData {
  const expirationDays = getExpirationDays(
    config.trafficAttribution && config.trafficAttribution.firstTouchExpirationDays,
    DEFAULT_FIRST_TOUCH_EXPIRATION_DAYS
  );

  return createTouchData(attribution, expirationDays);
}

function createLastTouchData (attribution: TrafficAttributionData): TouchData {
  const expirationDays = getExpirationDays(
    config.trafficAttribution && config.trafficAttribution.lastTouchExpirationDays,
    DEFAULT_LAST_TOUCH_EXPIRATION_DAYS
  );

  return createTouchData(attribution, expirationDays);
}

function isTouchExpired (touch: TouchData): boolean {
  return !touch.expiresAt || touch.expiresAt <= Date.now();
}

async function getStoredTouchData (
  storage: LocalForageCacheDriver,
  key: string
): Promise<TouchData | null> {
  try {
    const touch = await storage.getItem(key);

    return touch || null;
  } catch (reason) {
    Logger.error(reason, MODULE_NAME)();
    return null;
  }
}

let reportTrafficAttributionPromise: Promise<void> | null = null;

async function reportTrafficAttribution (
  commit: Commit,
  firstTouch: TouchData,
  lastTouch: TouchData | null
): Promise<void> {
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

export const actions: ActionTree<TrafficAttributionState, RootState> = {
  async [SYNCHRONIZE] ({ commit, getters }, router: VueRouter): Promise<void> {
    const storage = StorageManager.get(MODULE_NAME);

    const [storedFirstTouch, storedLastTouch] = await Promise.all([
      getStoredTouchData(storage, FIRST_TOUCH),
      getStoredTouchData(storage, LAST_TOUCH)
    ]);

    if (storedFirstTouch) {
      if (isTouchExpired(storedFirstTouch)) {
        commit(CLEAR_FIRST_TOUCH);
      } else {
        commit(SET_FIRST_TOUCH, storedFirstTouch);
      }
    }

    if (storedLastTouch) {
      if (isTouchExpired(storedLastTouch)) {
        commit(CLEAR_LAST_TOUCH);
      } else {
        commit(SET_LAST_TOUCH, storedLastTouch);
      }
    }

    const attribution = getTrafficAttributionDataFromRoute(router.currentRoute);

    if (!attribution) {
      return;
    }

    const currentFirstTouch: TouchData | null = getters[GET_FIRST_TOUCH];

    if (!currentFirstTouch) {
      const firstTouch = createFirstTouchData(attribution);
      const lastTouch = createLastTouchData(attribution);

      commit(SET_FIRST_TOUCH, firstTouch);
      commit(SET_LAST_TOUCH, lastTouch);
      return;
    }

    if (!hasTrafficAttributionAcquisitionSignal(attribution)) {
      return;
    }

    const currentLastTouch: TouchData | null = getters[GET_LAST_TOUCH];
    const isNewAttribution = !currentLastTouch || !isSameTouchAttribution(currentLastTouch.attribution, attribution);

    if (isNewAttribution) {
      commit(SET_LAST_TOUCH, createLastTouchData(attribution));
    }
  },
  async [REPORT_TRAFFIC_ATTRIBUTION] ({ commit, getters }): Promise<void> {
    if (reportTrafficAttributionPromise) {
      return reportTrafficAttributionPromise;
    }

    const firstTouch: TouchData | null = getters[GET_FIRST_TOUCH];
    const lastTouch: TouchData | null = getters[GET_LAST_TOUCH];

    if (!firstTouch) {
      return;
    }

    reportTrafficAttributionPromise = reportTrafficAttribution(commit, firstTouch, lastTouch)
      .finally(() => {
        reportTrafficAttributionPromise = null;
      });

    return reportTrafficAttributionPromise;
  }
};
