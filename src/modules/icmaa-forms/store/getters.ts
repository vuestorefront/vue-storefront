import { GetterTree } from 'vuex'
import FormsState, { FormsStateItem } from '../types/FormsState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<FormsState, RootState> = {
  getForms: (state): FormsStateItem[] => state.items,
  getFormByIdentifier: (state) => (identifier: string): FormsStateItem => state.items.find(f => f.identifier === identifier)
}

export default getters
