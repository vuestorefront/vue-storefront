import { MutationPayload } from "vuex";

import { Logger } from '@vue-storefront/core/lib/logger';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import RootState from "@vue-storefront/core/types/RootState";

import * as types from '../store/mutation-types';
import { CURRENT_REFRESH_TOKEN, CURRENT_TOKEN, CURRENT_USER, ORDERS_HISTORY } from "../types/local-storage-key";

export function cacheHandlerFactory() {
  return (mutation: MutationPayload, state: RootState) => {
    const type = mutation.type
    const userStorage = StorageManager.get('user');

    if (
      type.endsWith(types.USER_INFO_LOADED)
    ) {
      userStorage
        .setItem(CURRENT_USER, state.user.current)
        .catch((reason: any) => {
          Logger.error(reason)() // it doesn't work on SSR
        }) // populate cache
    }

    if (
      type.endsWith(types.USER_ORDERS_HISTORY_LOADED)
    ) {
      userStorage
        .setItem(ORDERS_HISTORY, state.user.orders_history)
        .catch((reason: any) => {
          Logger.error(reason)() // it doesn't work on SSR
        }) // populate cache
    }

    if (
      type.endsWith(types.USER_TOKEN_CHANGED)
    ) {
      userStorage
        .setItem(CURRENT_TOKEN, state.user.token)
        .catch((reason: any) => {
          Logger.error(reason)() // it doesn't work on SSR
        }) // populate cache
      if (state.user.refreshToken) {
        userStorage
          .setItem(CURRENT_REFRESH_TOKEN, state.user.refreshToken)
          .catch((reason: any) => {
            Logger.error(reason)() // it doesn't work on SSR
          }) // populate cache
      }
    }
  }
}