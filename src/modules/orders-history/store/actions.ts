import { ActionTree } from 'vuex';

import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';

import { FETCH_ORDERS_HISTORY, FETCH_SUGGESTED_PRODUCTS, REORDER_ITEM, FETCH_ORDER_DETAILS, SUBMIT_TAX_ID_UPDATE_REQUEST, REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE } from '../types/store/actions';
import { OrdersHistoryState } from '../types/store/state';
import { Order } from '../types/order';
import { SET_ORDERS_HISTORY, SET_SUGGESTED_PRODUCTS, SET_IS_REORDERING_ITEM } from '../types/store/mutations';
import { OrderAddress } from '../types/order-address';

export const actions: ActionTree<OrdersHistoryState, RootState> = {
  async [FETCH_ORDERS_HISTORY] (
    { commit },
    { filters }: { filters?: { excludeAlterationProducts?: boolean } } = {}
  ): Promise<Order[]> {
    const excludeAlterationProductsQuery = filters?.excludeAlterationProducts
      ? `&excludeAlterationProducts=true`
      : '';
    const url = processURLAddress(`${config.budsies.endpoint}/customers/me/orders?token={{token}}${excludeAlterationProductsQuery}`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      }
    });

    if (resultCode !== 200) {
      throw new Error('Error fetching orders history');
    }

    const orders = result.items || [];

    commit(SET_ORDERS_HISTORY, orders);

    return orders;
  },
  async [FETCH_SUGGESTED_PRODUCTS] ({ commit }, { pageSize }: { pageSize: number }): Promise<string[]> {
    const url = processURLAddress(`${config.budsies.endpoint}/customers/me/suggested-products/active-orders?token={{token}}&page_size=${pageSize}`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      }
    });

    if (resultCode !== 200) {
      throw new Error('Error fetching suggested products');
    }

    const productIds = result.items || [];

    commit(SET_SUGGESTED_PRODUCTS, productIds);

    return productIds;
  },
  async [REORDER_ITEM] ({ commit, dispatch }, payload: { orderItemId: number }): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/carts/me/items/add-from-order-requests?token={{token}}`);

    commit(SET_IS_REORDERING_ITEM, true);

    try {
      const { resultCode, result } = await TaskQueue.execute({
        url,
        payload: {
          method: 'POST',
          mode: 'cors',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        silent: true
      });

      if (resultCode !== 200) {
        const errorMessage = result?.errorMessage || 'Failed to reorder item';
        throw new Error(errorMessage);
      }
    } finally {
      commit(SET_IS_REORDERING_ITEM, false);
    }

    await dispatch('cart/pullServerCart', true, { root: true });
  },
  async [FETCH_ORDER_DETAILS] (_, { orderId }: { orderId: string }): Promise<Order> {
    const url = processURLAddress(`${config.budsies.endpoint}/customers/me/orders/${orderId}?token={{token}}`);

    const { result, resultCode } = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      }
    });

    if (resultCode !== 200) {
      throw new Error('Order not found');
    }

    return result;
  },
  async [SUBMIT_TAX_ID_UPDATE_REQUEST] ({ commit }, { orderId, taxId }: { orderId: string, taxId: string }): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/order/taxid-update-requests?token={{token}}`);

    const { resultCode, result } = await TaskQueue.execute({
      url,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ taxId, orderId, type: 'shipping' })
      },
      silent: true
    });

    if (resultCode !== 200) {
      const errorMessage = result?.errorMessage || 'Failed to submit Tax ID';
      throw new Error(errorMessage);
    }
  },
  async [REQUEST_ORDER_SHIPPING_ADDRESS_UPDATE] (_context, { address }: { address: OrderAddress }): Promise<void> {
    const url = processURLAddress(`${config.budsies.endpoint}/order/address/update-requests?token={{token}}`);

    const request: Pick<
    OrderAddress,
    'region_id' |
    'region' |
    'telephone' |
    'city' |
    'street' |
    'postcode' |
    'lastname' |
    'firstname' |
    'vat_id' |
    'extension_attributes'
    > & {address_id: number} = {
      region_id: address.region_id,
      region: address.region,
      telephone: address.telephone,
      city: address.city,
      street: address.street,
      postcode: address.postcode,
      lastname: address.lastname,
      firstname: address.firstname,
      vat_id: address.vat_id,
      address_id: address.entity_id,
      extension_attributes: address.extension_attributes
    };

    const { resultCode, result } = await TaskQueue.execute({
      url,
      payload: {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ request })
      },
      silent: true
    });

    if (resultCode !== 200) {
      const errorMessage = result?.errorMessage || 'Failed to update shipping address';
      throw new Error(errorMessage);
    }
  }
}
