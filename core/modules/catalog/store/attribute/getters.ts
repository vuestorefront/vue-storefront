import { GetterTree } from 'vuex'
import AttributeState from '../../types/AttributeState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<AttributeState, RootState> = {
  attributeListByCode: (state) => state.list_by_code,
  attributeListById: (state) => state.list_by_id,
  getBlacklist: (state) => state.blacklist,
  getAllComparableAttributes: (state, getters) => {
    const attributesByCode = getters.attributeListByCode
    return Object.values(attributesByCode).filter((a: any) => parseInt(a.is_comparable))
  }
}

export default getters
