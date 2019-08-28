import { GetterTree } from 'vuex'
import AttributeState from '../../types/AttributeState'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<AttributeState, RootState> = {
  getAttributeListByCode: (state) => state.list_by_code,
  getAttributeListById: (state) => state.list_by_id,
  // @deprecated
  attributeListByCode: (state, getters) => getters.getAttributeListByCode,
  // @deprecated
  attributeListById: (state, getters) => getters.getAttributeListById,
  getBlacklist: (state) => state.blacklist,
  getAllComparableAttributes: (state, getters) => {
    const attributesByCode = getters.getAttributeListByCode
    return Object.values(attributesByCode).filter((a: any) => parseInt(a.is_comparable))
  }
}

export default getters
