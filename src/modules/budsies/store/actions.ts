import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { ActionTree, Commit } from 'vuex'
import config from 'config'
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
import Bodypart from '../models/bodypart.model'
import BodypartValue from '../models/bodypart-value.model'
import BodypartValueApiResponse from '../models/bodypart-value-api-response.interface'
import bodypartFactory from '../factories/bodypart.factory'
import bodypartValueFactory from '../factories/bodypart-value.factory'
import isBodypartApiResponse from '../models/is-bodypart-api-response.typeguard'
import isBodypartValueApiResponse from '../models/is-bodypart-value-api-response.typeguard'
import BodypartApiResponse from '../models/bodypart-api-response.interface'
import Task from 'core/lib/sync/types/Task'
import { Dictionary } from '../types/Dictionary.type';
import { StoreRating } from '../types/store-rating.interface';
import { StatisticValue } from '../types/statistic-value.interface';
import { StatisticMetric } from '../types/statistic-metric';

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

function parseBodyPartValues (commit: Commit, item: any): void {
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
    const url = processURLAddress(`${config.budsies.endpoint}/plushies/extra-photos-upgrades`);

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
  // TODO: used in Bulkorders theme on Bulk Request page
  async loadProductBodyparts (
    { dispatch },
    { productId, useCache = true }
  ): Promise<void> {
    return dispatch('loadProductsBodyParts', { useCache, productIds: [productId] });
  },
  async loadProductsBodyParts (
    { commit, getters },
    { productIds, useCache = true }:
    {
      productIds: number[],
      useCache: boolean
    }
  ): Promise<void> {
    let productIdsForLoad: number[] = [];

    if (!useCache) {
      productIdsForLoad = productIds;
    } else {
      for (const id of productIds) {
        const productBodyParts = getters['getProductBodyparts'](id);

        if (productBodyParts.length > 0) {
          continue;
        }

        productIdsForLoad.push(id);
      }
    }

    if (!productIdsForLoad.length) {
      return;
    }

    const url = processURLAddress(`${config.budsies.endpoint}/plushies/body-parts`);

    const query = new URLSearchParams();

    for (const id of productIdsForLoad) {
      query.append('productId[]', id.toString());
    }

    const result = await TaskQueue.execute({
      url: `${url}?${query.toString()}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    result.result.forEach((item: any) => {
      parseBodyPartValues(commit, item);
    });

    const bodyparts = parse<Bodypart, BodypartApiResponse>(
      result.result,
      bodypartFactory,
      isBodypartApiResponse
    );

    const productBodyPartsDictionary: Dictionary<Bodypart[]> = {};

    for (const bodypart of bodyparts) {
      if (!productBodyPartsDictionary[bodypart.productId]) {
        productBodyPartsDictionary[bodypart.productId] = [];
      }

      productBodyPartsDictionary[bodypart.productId].push(bodypart);
    }

    for (const [key, value] of Object.entries(productBodyPartsDictionary)) {
      commit('setProductBodyparts', { key, bodyparts: value });
    }
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
  async loadRecoverableCart (
    { commit, state },
    { recoveryId, recoveryCode }
  ): Promise<any> {
    const url = processURLAddress(`${config.budsies.endpoint}/carts/recovery-requests`);

    const { result, resultCode, code } = await TaskQueue.execute({
      url: `${url}?recoveryId=${recoveryId}&recoveryCode=${recoveryCode}&token={{token}}`,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'POST'
      },
      silent: true
    });

    if (resultCode === 401 || code === 401) {
      const error = {
        code
      };

      throw error;
    }

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
  async shareBirthday (
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
      throw Error('Error while sharing birthday ' + result)
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
  },
  async createPlushieReminder (context, payload: {
    customerEmail: string,
    remindDate: string
  }): Promise<void> {
    const url = `${config.budsies.endpoint}/plushie-reminders`;

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
      throw new Error(`Error while send plushie reminders request: ${result}`);
    }
  },
  async fetchStoreRating (
    { commit, getters },
    {
      storeId,
      useCache = true
    }: {
      storeId: string,
      useCache: boolean
    }
  ): Promise<StoreRating> {
    const storeRating = getters['getStoreRating'];

    if (useCache && storeRating) {
      return storeRating;
    }

    const url = processURLAddress(
      `${config.budsies.endpoint}/stores/ratings?storeId=${storeId}`
    );

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200) {
      throw new Error('Error while store rating fetching');
    }

    commit(types.STORE_RATING_SET, result.storeRating);

    return result;
  },
  async fetchStatisticValuesByMetric (
    { commit, getters },
    {
      metric,
      useCache = true
    }: {
      metric: StatisticMetric,
      useCache: boolean
    }
  ): Promise<Pick<StatisticValue, 'value'>> {
    const cachedMetric: Pick<StatisticValue, 'value'> = getters.getStatisticValueByMetric(metric);

    if (useCache && cachedMetric) {
      return cachedMetric;
    }

    const url = processURLAddress(
      `${config.budsies.endpoint}/statistic-values?metric=${metric}`
    );

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    if (resultCode !== 200 || !result[0]) {
      throw new Error(`Error while statistic value for metric '${metric}' fetch`);
    }

    commit(types.METRIC_SET, result[0]);

    return result;
  },
  reorder (context, payload: { orderId: number }) {
    const url = `${config.budsies.endpoint}/order/reorder?token={{token}}&cartId={{cartId}}`;

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(payload)
      },
      silent: true
    });
  },
  updatePersonalDetails ({ rootGetters }, personalDetails: {
    emailAddress: string,
    firstName: string,
    lastName: string
  }): Promise<Task> {
    const url = `${config.budsies.endpoint}/carts/personal-details-update-requests?token={{token}}`;
    const cartId = rootGetters['cart/getCartToken'];

    const body = {
      email: personalDetails.emailAddress,
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      cartId
    };

    return TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body)
      },
      silent: true
    });
  }
}
