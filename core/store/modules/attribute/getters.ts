import { GetterTree } from 'vuex'
import AttributeState from './types/AttributeState'
import RootState from '../../types/RootState'

const getters: GetterTree<AttributeState, RootState> = {
  attributeListByCode: (state) => state.list_by_code,
  attributeListById: (state) => state.list_by_id
}

export default getters
