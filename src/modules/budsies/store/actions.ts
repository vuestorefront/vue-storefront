import Vue from 'vue';
import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { ActionTree } from 'vuex'
import config from 'config'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { BudsiesState } from '../types/State'
import * as types from './mutation-types'
import ObjectBuilderInterface from '../types/object-builder.interface'
import extraPhotoAddonFactory from '../factories/extra-photo-addon.factory'
import ExtraPhotoAddon from '../models/extra-photo-addon.model'
import ExtraPhotoAddonApiResponse from '../models/extra-photo-addon-api-response.interface'
import isExtraPhotoAddonApiResponse from '../models/is-extra-photo-addon-api-response.typeguard'
import rushAddonFactory from '../factories/rush-addon.factory'
import RushAddon from '../models/rush-addon.model'
import RushAddonApiResponse from '../models/rush-addon-api-response.interface'
import isRushAddonApiResponse from '../models/is-rush-addon-api-response.typeguard'
import { Logger } from '@vue-storefront/core/lib/logger'
import Bodypart from '../models/bodypart.model'
import BodypartValue from '../models/bodypart-value.model'
import BodypartValueApiResponse from '../models/bodypart-value-api-response.interface'
import bodypartFactory from '../factories/bodypart.factory'
import bodypartValueFactory from '../factories/bodypart-value.factory'
import isBodypartApiResponse from '../models/is-bodypart-api-response.typeguard'
import isBodypartValueApiResponse from '../models/is-bodypart-value-api-response.typeguard'
import BodypartApiResponse from '../models/bodypart-api-response.interface'
import Task from 'core/lib/sync/types/Task'
import getCartTokenCookieKey from '../helpers/get-cart-token-cookie-key.function'

function parse<T, R> (
  items: unknown[],
  objectBuilder: ObjectBuilderInterface<T, R>,
  typeGuard: (arg: unknown) => arg is R
): T[] {
  const values: T[] = [];

  items.forEach((item) => {
    if (!typeGuard(item)) {
      console.error(item);
      throw new Error('Unexpected response!');
    }

    const value = objectBuilder(item);

    values.push(value);
  });

  return values;
}

export const actions: ActionTree<BudsiesState, RootState> = {
  async loadBreeds (
    { commit, state }
  ): Promise<void> {
    if (state.breeds.length > 0) {
      return;
    }

    const url = processURLAddress(`${config.budsies.endpoint}/plushies/breeds`);

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    commit('setPlushieBreeds', result.result);
  },
  async loadExtraPhotosAddons (
    { commit, state },
    { productId }
  ): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/printed-products/extra-photos-addons`);

    const result = await TaskQueue.execute({
      url: `${url}?productId=${productId}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    const addons = parse<ExtraPhotoAddon, ExtraPhotoAddonApiResponse>(result.result, extraPhotoAddonFactory, isExtraPhotoAddonApiResponse);

    commit('setPrintedProductAddons', { key: productId, addons: addons });
  },
  async loadProductRushAddons (
    { commit, state },
    { productId }
  ): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/plushies/rush-upgrades`);

    const result = await TaskQueue.execute({
      url: `${url}?productId=${productId}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    const addons = parse<RushAddon, RushAddonApiResponse>(result.result, rushAddonFactory, isRushAddonApiResponse);

    commit('setProductRushAddons', { key: productId, addons });
  },
  async loadProductBodyparts (
    { commit, getters },
    { productId, useCache = true }
  ): Promise<void> {
    if (useCache && getters['getProductBodyparts'](productId).length !== 0) {
      return;
    }

    const url = processURLAddress(`${config.budsies.endpoint}/plushies/body-parts`);

    const result = await TaskQueue.execute({
      url: `${url}?productId=${productId}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    result.result.forEach((item: any) => {
      const values = parse<BodypartValue, BodypartValueApiResponse>(
        item.values,
        bodypartValueFactory,
        isBodypartValueApiResponse
      );

      if (item.child_bodyparts) {
        item.child_bodyparts.forEach((childItem: any) => {
          const childItemValues = parse<BodypartValue, BodypartValueApiResponse>(
            childItem.values,
            bodypartValueFactory,
            isBodypartValueApiResponse
          );

          commit('setBodypartBodypartsValues', { key: childItem.id + '', values: childItemValues });

          delete childItem.values;
        })
      }

      commit('setBodypartBodypartsValues', { key: item.id + '', values });

      delete item.values;
    });

    const bodyparts = parse<Bodypart, BodypartApiResponse>(
      result.result,
      bodypartFactory,
      isBodypartApiResponse
    );

    commit('setProductBodyparts', { key: productId, bodyparts });
  },
  async createNewPlushie (
    { commit, state },
    { productId }
  ): Promise<Task> {
    const url = processURLAddress(`${config.budsies.endpoint}/plushies`);

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ productId })
      },
      silent: true
    });
  },
  async fetchPlushieById (context, { plushieId }): Promise<Task> {
    const url = processURLAddress(`${config.budsies.endpoint}/plushies`);

    return TaskQueue.execute({
      url: `${url}/${plushieId}`,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    })
  },
  async loadPlushieShortcode (
    { commit, state },
    { plushieId }
  ): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/plushies/short-codes`);

    const result = await TaskQueue.execute({
      url: `${url}?plushieId=${plushieId}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    commit('setPlushieShortcode', { key: plushieId, shortcode: result.result });
  },
  async synchronize ({ commit, dispatch }) {
    const budsiesStorage = StorageManager.get(types.SN_BUDSIES);
    const cartStorage = StorageManager.get('cart');
    const customerEmail = await budsiesStorage.getItem('customer-email');
    const cartTokenFromLocalStorage = await cartStorage.getItem('current-cart-token');
    let cartTokenFromCookies = Vue.$cookies.get(getCartTokenCookieKey());

    if (cartTokenFromCookies === 'null') {
      cartTokenFromCookies = null;
    }

    if (!cartTokenFromLocalStorage && cartTokenFromCookies) {
      await cartStorage.setItem('current-cart-token', cartTokenFromCookies);

      dispatch(
        'cart/synchronizeCart',
        {
          forceClientState: false,
          forceSync: true
        },
        { root: true }
      )
    }

    if (customerEmail) {
      commit(types.CUSTOMER_EMAIL_SET, { email: customerEmail })
      Logger.info('Customer Email received from cache.', 'cache', customerEmail)()
    }

    EventBus.$emit('budsies-store-synchronized');
  },
  async loadRecoverableCart (
    { commit, state },
    { recoveryId, recoveryCode }
  ): Promise<any> {
    const url = processURLAddress(`${config.budsies.endpoint}/carts/recovery-requests`);

    const { result, resultCode } = await TaskQueue.execute({
      url: `${url}?recoveryId=${recoveryId}&recoveryCode=${recoveryCode}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw Error('Error while recovering cart. ' + result)
    }

    return result;
  },
  async createMailingListSubscription (
    store,
    payload: {email: string, listId: string}
  ): Promise<Task> {
    const url = processURLAddress(`${config.budsies.endpoint}/mailing-list-subscriptions?token={{token}}`);

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    })
  },
  async createNewsletterSubscription (
    { commit, state },
    { email }: { email: string }
  ): Promise<Task> {
    const url = processURLAddress(`${config.budsies.endpoint}/newsletter/subscriptions?token={{token}}`);

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ email })
      },
      silent: false
    });
  },
  async sharePetBirthday (
    { state },
    payload: {
      name: string,
      birthDay: number,
      birthMonth: number,
      email: string
    }
  ): Promise<any> {
    const url = processURLAddress(`${config.budsies.endpoint}/share/artists?token={{token}}`)

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw Error('Error while sharing pet birthday ' + result)
    }

    return result;
  },
  async shareCustomerStory (
    { state },
    payload: {
      customerStoryText: string,
      orderId: number
    }
  ): Promise<any> {
    const url = processURLAddress(`${config.budsies.endpoint}/share/customer-stories`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw Error('Error while sharing customer story ' + result)
    }

    return result;
  },
  async creditCardProcessingErrorNotifications (
    context,
    payload: {
      customerEmail: string,
      customerName: string,
      customerPhone?: string,
      errorReason: string
    }
  ): Promise<any> {
    const url = processURLAddress(`${config.budsies.endpoint}/order/creditcard-processing-error-notifications?token={{token}}&cartId={{cartId}}`)

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw Error('Error while sending creditcard processing error notification' + result)
    }

    return result;
  },
  async createNewAddress (context, payload): Promise<void> {
    const url = `${config.budsies.endpoint}/address/create?token={{token}}`;

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw new Error(`Error while creating address: ${result}`);
    }

    EventBus.$emit('address-added', result);
  },
  async updateAddress (context, payload): Promise<void> {
    const url = `${config.budsies.endpoint}/address/update?token={{token}}`;

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw new Error(`Error while creating address: ${result}`);
    }

    EventBus.$emit('address-updated', result);
  },
  async removeAddress (context, payload): Promise<void> {
    const url = `${config.budsies.endpoint}/address/delete?token={{token}}`;

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: false
    });

    if (resultCode !== 200) {
      throw new Error(`Error while creating address: ${result}`);
    }

    EventBus.$emit('address-removed', payload.address.id);
  }
}
