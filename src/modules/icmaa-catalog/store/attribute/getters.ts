import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import AttributeState from '@vue-storefront/core/modules/catalog/types/AttributeState'
import { optionLabel } from '@vue-storefront/core/modules/catalog-next/helpers/optionLabel'

const getters: GetterTree<AttributeState, RootState> = {
  getOptionLabel: (state) => ({ attributeKey, searchBy = 'code', optionId }) => {
    return optionLabel(state, { attributeKey, searchBy, optionId })
  },
  getAttributeLabel: (state, getters) => ({ attributeKey, searchBy = 'code' }) => {
    const attributeList = getters.getAttributeListByCode
    if (searchBy === 'code' && attributeList[attributeKey]) {
      return attributeList[attributeKey]['frontend_label'] || attributeList[attributeKey]['default_frontend_label']
    }

    const attribute = Object.values(attributeList).find(attribute => {
      return attribute[searchBy] && attribute[searchBy] === attributeKey
    })

    return attribute ? attribute['frontend_label'] : attributeKey
  }
}

export default getters
