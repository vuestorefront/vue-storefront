import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'
import { isServer } from '@vue-storefront/core/helpers';

import { ENSURE_SCRIPT_LOADED } from '../types/actions';
import { AmazonPayState } from '../types/AmazonPayState'
import { AMAZON_SESSION_ID } from '../types/getters';
import { CLEAR_AMAZON_SESSION_ID, SET_AMAZON_SESSION_ID } from '../types/mutations';

export const AmazonPayModule: Module<AmazonPayState, RootState> = {
  namespaced: true,
  state: {
    sessionId: null,
    scriptLoadingPromise: null
  },
  mutations: {
    [SET_AMAZON_SESSION_ID] (state, sessionId: string) {
      state.sessionId = sessionId;
    },
    [CLEAR_AMAZON_SESSION_ID] (state) {
      state.sessionId = null;
    }
  },
  getters: {
    [AMAZON_SESSION_ID] (state): string | null {
      return state.sessionId;
    }
  },
  actions: {
    async [ENSURE_SCRIPT_LOADED] ({ state }): Promise<void> {
      if (isServer) {
        return;
      }

      if (state.scriptLoadingPromise) {
        return state.scriptLoadingPromise;
      }

      if (window.amazon) {
        return;
      }

      const promise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://static-na.payments-amazon.com/checkout.js';

        script.onload = () => {
          resolve();
          state.scriptLoadingPromise = null;
        }

        script.onerror = () => {
          reject();
          state.scriptLoadingPromise = null;
        }

        document.head.appendChild(script);
      });

      state.scriptLoadingPromise = promise;

      return promise;
    }
  }
}
