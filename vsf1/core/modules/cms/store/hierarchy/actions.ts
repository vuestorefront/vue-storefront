import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import RootState from '@vue-storefront/core/types/RootState';
import CmsHierarchyState from '../../types/CmsHierarchyState'
import { createHierarchyLoadQuery } from '@vue-storefront/core/modules/cms/helpers'

const actions: ActionTree<CmsHierarchyState, RootState> = {
  list (context, { id, entityType = 'cms_hierarchy', excludeFields = null, includeFields = null }) {
    return quickSearchByQuery({
      query: createHierarchyLoadQuery({ id }),
      entityType,
      excludeFields,
      includeFields
    })
  }
}

export default actions
