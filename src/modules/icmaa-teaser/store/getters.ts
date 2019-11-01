import { GetterTree } from 'vuex'
import TeaserState, { TeaserStateItem } from '../types/TeaserState'
import RootState from '@vue-storefront/core/types/RootState'

import config from 'config'
import { isDatetimeInBetween } from 'icmaa-config/helpers/datetime'

import forEach from 'lodash-es/forEach'
import isArray from 'lodash-es/isArray'
import intersection from 'lodash-es/intersection'
import orderBy from 'lodash-es/orderBy'

const getters: GetterTree<TeaserState, RootState> = {
  getTeaser: (state): TeaserStateItem[] => state.items,
  getSmallTeaser: (state, getters) => (tag: string): TeaserStateItem[] => {
    return getters.getFilteredTeaser({ size: 'small', tag: tag.split(',') })
  },
  getLargeTeaser: (state, getters) => (tag: string): TeaserStateItem[] => {
    return getters.getFilteredTeaser({ size: 'large', tag: tag.split(',') })
  },
  getFilteredTeaser: (state, getters, RootState, rootGetters) => (filters): TeaserStateItem[] => {
    let items = state.items
    forEach(filters, (value, key) => {
      if (isArray(value)) {
        items = items.filter(i => {
          if (isArray(i[key])) {
            return intersection(i[key], value).length > 0
          } else {
            return value.includes(i[key])
          }
        })
      } else {
        items = items.filter(i => i[key] === value)
      }
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

    items = items
      .filter(i => isDatetimeInBetween(i.showFrom, i.showTo))
      .filter(i => i.active)

    /**
     * Order result array
     * @see https://vuejs.org/v2/guide/migration.html#Replacing-the-orderBy-Filter
     * */
    items = orderBy(items, ['order'], ['desc'])

    return items
  }
}

export default getters
