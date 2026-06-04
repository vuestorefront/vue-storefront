import { ActionTree } from 'vuex';
import VueRouter from 'vue-router';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { Logger } from '@vue-storefront/core/lib/logger';
import RootState from '@vue-storefront/core/types/RootState';

import { getTrafficAttributionDataFromRoute } from '../helpers/get-traffic-attribution-data-from-route.function';
import { TrafficAttributionData } from '../types/traffic-attribution.interface';
import { TrafficAttributionState } from '../types/state.interface';
import { MODULE_NAME } from '../types/store-name';
import { REPORT_TRAFFIC_ATTRIBUTION, SYNCHRONIZE } from '../types/actions';
import { GET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION, GET_TRAFFIC_ATTRIBUTION } from '../types/getters';
import {
  SET_TRAFFIC_ATTRIBUTION,
  SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION,
  CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION
} from '../types/mutations';
import { LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION } from '../types/local-storage-key';

const DEFAULT_SOURCE = 'direct';

export const actions: ActionTree<TrafficAttributionState, RootState> = {
  async [SYNCHRONIZE] ({ commit }, router: VueRouter): Promise<void> {
    const storage = StorageManager.get(MODULE_NAME);
    const lastMeaningfulTrafficAttribution = await storage.getItem(LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION);

    if (lastMeaningfulTrafficAttribution) {
      commit(SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION, lastMeaningfulTrafficAttribution);
    }

    const attribution = getTrafficAttributionDataFromRoute(router.currentRoute);

    if (attribution.utm_source) {
      commit(SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION, attribution);
    } else {
      attribution.utm_source = DEFAULT_SOURCE;
      commit(SET_TRAFFIC_ATTRIBUTION, attribution);
    }
  },
  async [REPORT_TRAFFIC_ATTRIBUTION] ({ commit, getters }): Promise<void> {
    const lastMeaningful: TrafficAttributionData | null = getters[GET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION];
    const attributionData: TrafficAttributionData | null = lastMeaningful ?? getters[GET_TRAFFIC_ATTRIBUTION];

    if (!attributionData) {
      return;
    }

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
        body: JSON.stringify({ request: attributionData })
      },
      silent: true
    });

    if (resultCode !== 200) {
      Logger.error('Error reporting traffic attribution', MODULE_NAME)();
      return;
    }

    if (lastMeaningful) {
      commit(CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION);
    }
  }
};
