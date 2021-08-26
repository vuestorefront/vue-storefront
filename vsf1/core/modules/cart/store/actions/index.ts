
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '@vue-storefront/core/modules/cart/types/CartState'
import connectActions from './connectActions'
import couponActions from './couponActions'
import itemActions from './itemActions'
import mergeActions from './mergeActions';
import methodsActions from './methodsActions'
import productActions from './productActions'
import quantityActions from './quantityActions'
import synchronizeActions from './synchronizeActions'
import totalsActions from './totalsActions'

const actions: ActionTree<CartState, RootState> = {
  ...connectActions,
  ...itemActions,
  ...couponActions,
  ...mergeActions,
  ...methodsActions,
  ...productActions,
  ...quantityActions,
  ...synchronizeActions,
  ...totalsActions
}

export default actions
