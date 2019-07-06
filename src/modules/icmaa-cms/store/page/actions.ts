import { ActionTree } from 'vuex'
import { single as singleAbstract, MutationTypesInterface, SingleOptionsInterface, OptionsInterface } from '../abstract/actions'

import { cmsPageStorageKey as storageKey } from './'
import * as types from './mutation-types'
import PageState, { PageStateItem } from '../../types/PageState'
import RootState from '@vue-storefront/core/types/RootState';

const documentType = 'page';
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_CMS_PAGE_ADD,
  upd: types.ICMAA_CMS_PAGE_UPD,
  rmv: types.ICMAA_CMS_PAGE_RMV
}

const actions: ActionTree<PageState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<PageStateItem> =>
    singleAbstract<PageStateItem>({ documentType, mutationTypes, storageKey, context, options })
}

export default actions
