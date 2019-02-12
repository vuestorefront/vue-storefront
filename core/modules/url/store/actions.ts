import { UrlState } from '../types/UrlState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<UrlState, any> = {
  // if you want to use cache in your module you can load cached data like this
  registerMapping ({ commit }, { url, routeData }) {
    return new Promise ((resolve, reject) => {
      commit(types.REGISTER_MAPPING, { url, routeData })
      cacheStorage.setItem(url, routeData).then(result => {
        resolve(routeData)
      }).catch(() => reject())
    })
  },
  mapUrl ({ state, dispatch }, { url }) {
    return new Promise ((resolve, reject) => {
      console.log(url)
      console.log(state.dispatcherMap)
      if (state.dispatcherMap.hasOwnProperty(url)) {
        return resolve (state.dispatcherMap[url])
      }
      cacheStorage.getItem(url).then(routeData => {
        if (routeData !== null) {
          return resolve(routeData)
        } else {
          return resolve(dispatch('mappingFallback', { url }))
        }
      }).catch(() => reject())    
    })
  },
  /**
   * Router mapping fallback - get the proper URL from API
   */
  mappingFallback ({ commit, dispatch }, { url }) {
    return new Promise ((resolve, reject) => {
      if (url === '/c/women-20') {
        resolve('/c/men-11')
      } else {
        resolve(null)
      }
    })
  }
}