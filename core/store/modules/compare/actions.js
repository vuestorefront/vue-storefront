import * as types from '../../mutation-types'
import EventBus from '../../lib/event-bus'
import { htmlDecode } from '../../lib/filters'
import i18n from '../../lib/i18n'

export default {
  load (context) {
    const commit = context.commit
    global.$VS.db.compareCollection.getItem('current-compare', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.COMPARE_LOAD_COMPARE, storedItems)
    })
  },
  addItem ({commit}, product) {
    commit(types.COMPARE_ADD_ITEM, {product})
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(product.name) }),
      action1: {label: i18n.t('OK'), action: 'close'}
    })
  },
  removeItem ({commit}, product) {
    commit(types.COMPARE_DEL_ITEM, {product})
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(product.name) }),
      action1: {label: i18n.t('OK'), action: 'close'}
    })
  }
}
