import { GetterTree } from 'vuex'
import AdviceState, { AdviceStateItem } from '../types/AdviceState'
import RootState from '@vue-storefront/core/types/RootState'

import config from 'config'
import head from 'lodash-es/head'
import intersection from 'lodash-es/intersection'

const getters: GetterTree<AdviceState, RootState> = {
  getAdvice: (state): AdviceStateItem[] => state.items,
  getSingleAdvice: (state, getters, RootState, rootGetters) => (tag: string): AdviceStateItem => {
    let items = state.items
    const tags = tag.split(',')

    items = items.filter(i => {
      return intersection(i.tag, tags).length > 0
    })

    const cluster = rootGetters['user/getCluster']
    items = items.filter(i => {
      if (i.cluster.length === 0) {
        return true
      }

      if (!cluster && i.cluster.includes(config.icmaa_cluster.noClusterValue)) {
        return true
      }

      return i.cluster.includes(cluster)
    })

    return head(items)
  }
}

export default getters
