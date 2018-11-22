import { ActionTree } from "vuex"
import RootState from '@vue-storefront/store/types/RootState'
import DataManagerState from '../types/DataManagerState'

const actions: ActionTree <DataManagerState, RootState> = {
  registerFetch (context, fetchPromise) {
    context.state.fetchOperations.push(fetchPromise)
    return fetchPromise
  },

  fetchAll (context) {
    console.log('datamanager fetchAll action start----------------------------------------------------', context.state.fetchOperations)
    return Promise.all(context.state.fetchOperations)
  }
}

export default actions
