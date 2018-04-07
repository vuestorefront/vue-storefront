import * as types from '../../mutation-types'
import { htmlDecode } from 'core/filters'
import rootStore from '../../'
const EventBus = rootStore.EventBus
const i18n = rootStore.i18n

export default {
  load (context) {
    const commit = context.commit
    global.db.compareCollection.getItem('current-compare', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.COMPARE_LOAD_COMPARE, storedItems)
    })
  },
  addItem ({commit}, product) {
    commit(types.COMPARE_ADD_ITEM, {product})
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(product.name) }),
      action1: {label: 'OK', action: 'close'}
    })
  },
  removeItem ({commit}, product) {
    commit(types.COMPARE_DEL_ITEM, {product})
    EventBus.$emit('notification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(product.name) }),
      action1: {label: 'OK', action: 'close'}
    })
  }
}
