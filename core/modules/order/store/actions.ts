import Vue from 'vue'
import * as types from './mutation-types'
import { ValidationError } from '@vue-storefront/store/lib/exceptions'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import OrderState from '../types/OrderState'
const Ajv = require('ajv') // json validator
import rootStore from '@vue-storefront/store'
import { isOnline } from '@vue-storefront/store/lib/search'
import i18n from '@vue-storefront/i18n'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
const actions: ActionTree<OrderState, RootState> = {
  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  placeOrder ({ commit }, order) {
    const ajv = new Ajv()
    const orderSchema = require('./order.schema.json')
    const orderSchemaExtension = require('./order.schema.extension.json')
    const validate = ajv.compile(Object.assign(orderSchema, orderSchemaExtension))

    const storeView = currentStoreView()
    if (storeView.storeCode) {
      order.store_code = storeView.storeCode
    }

    if (!validate(order)) { // schema validation of upcoming order
      throw new ValidationError(validate.errors)
    } else {
      Vue.prototype.$bus.$emit('order-before-placed', { order: order })
      if (!rootStore.state.config.orders.directBackendSync || !isOnline())
      {
        commit(types.ORDER_PLACE_ORDER, order)
        Vue.prototype.$bus.$emit('order-after-placed', { order: order })
        return Promise.resolve(true)
      } else {
        Vue.prototype.$bus.$emit('notification-progress-start', i18n.t('Processing order...'))
        return TaskQueue.execute({ url: rootStore.state.config.orders.endpoint, // sync the order
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(order)
          },
        }).then((task: any) => {
          Vue.prototype.$bus.$emit('notification-progress-stop')
          if (task.resultCode !== 500) {
            order.transmited = true
            commit(types.ORDER_PLACE_ORDER, order) // archive this order but not trasmit it second time
            commit(types.ORDER_LAST_ORDER_WITH_CONFIRMATION, { order: order, confirmation: task.result })
            Vue.prototype.$bus.$emit('order-after-placed', { order: order, confirmation: task.result })
          }
          return task
        }).catch(e => {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('The order can not be transfered because of server error. Order has been queued'),
            action1: { label: i18n.t('OK') }
          })
          order.transmited = false // queue order
          commit(types.ORDER_PLACE_ORDER, order) // archive this order but not trasmit it second time
          Vue.prototype.$bus.$emit('notification-progress-stop')
          throw (e)
        })
      }
    }
  }
}

export default actions
