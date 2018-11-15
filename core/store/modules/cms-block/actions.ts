import Vue from 'vue'
import { ActionTree } from "vuex"
import { quickSearchByQuery } from "core/store/lib/search"
import * as types from '../../mutation-types'
import SearchQuery from "core/store/lib/search/searchQuery"
import RootState from "../../types/RootState"
import { entityKeyName } from '../../lib/entities'
import CmsBlockState from "./types/CmsBlockState"
import store from '@vue-storefront/store'

const actions: ActionTree<CmsBlockState, RootState> = {

  /**
   * Retrieve cms blocks
   *
   * @param context
   * @param {any} filterValues
   * @param {any} filterField
   * @param {any} size
   * @param {any} start
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  list (context, { filterValues = null, filterField = 'identifier', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    let query = new SearchQuery()

    if (filterValues) {
      query = query.applyFilter({key: filterField, value: {'like': filterValues}})
    }
    if (skipCache || (!context.state.cmsBlocks || context.state.cmsBlocks.length === 0)) {
      return quickSearchByQuery({ query, entityType: 'cms_block', excludeFields, includeFields })
      .then((resp) => {
        context.commit(types.CMS_BLOCK_UPDATE_CMS_BLOCKS, resp.items)
        Vue.prototype.$bus.$emit('cmsblock-after-list', { query, size: size, start: start, cmsBlocks: resp.items })
        return resp.items
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      return new Promise((resolve, reject) => {
        let resp = context.state.cmsBlocks
        Vue.prototype.$bus.$emit('cmsblock-after-list', { query, size: size, start: start, cmsBlocks: resp })
        resolve(resp)
      })
    }
  },

  /**
   * Retrieve single cms block by key value
   *
   * @param context
   * @param {any} key
   * @param {any} value
   * @param {any} excludeFields
   * @param {any} includeFields
   * @returns {Promise<T> & Promise<any>}
   */
  single (context, { key = 'identifier', value, excludeFields = null, includeFields = null }) {
    const state = context.state
    const dispatch = context.dispatch
    return new Promise((resolve, reject) => {
      if (value == undefined) {
        if (state.cmsBlocks.length == 0 || Object.keys(Vue.prototype.$db.cmsPagesCollection._localCache).length == 0 ) {
          dispatch('list', { size: store.state.config.cms_block.max_count, excludeFields, includeFields }).then(cmsblocks => {
            // let cmsBlock = cmsblocks.find((itm) => { return itm[key] === value })
            return resolve(cmsblocks)
          })
        }
      } else {
        if (state.cmsBlocks.length > 0) {
          // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
          let cmsBlock = state.cmsBlocks.find((itm) => { return itm[key] === value })

          if (cmsBlock) {
            resolve(cmsBlock)
          } else {
            reject(new Error('CMS block query returned empty result ' + key + ' = ' + value))
          }
        } else {
          console.log('GET CMS BLOCK ---------------------------- value ', value)
          Vue.prototype.$db.cmsBlocksCollection.getItem(entityKeyName(key, value), (error, cmsBlock) => {
            if (error) {
              console.error(error)
              reject(error)
            }
            if (cmsBlock) {
              resolve(cmsBlock)
            } else {
              // Assuming CMS data will not contain too much records we load all collection and save it to DB and state for further usage
              console.log('GET CMS BLOCK LIST ---------------------------- size ', store.state.config.cms_block.max_count)
              dispatch('list', { size: store.state.config.cms_block.max_count, excludeFields, includeFields }).then(cmsblocks => {
                let cmsBlock = cmsblocks.find((itm) => { return itm[key] === value })
                return resolve(cmsBlock)
              })
            }
          })
          /* if (Object.keys(Vue.prototype.$db.cmsBlocksCollection._localCache).length > 0) {
            console.log('get from db Block------------------------ '+ key + '----' + value)
              Vue.prototype.$db.cmsBlocksCollection.getItem(entityKeyName(key, value), (error, cmsBlock) => {
                console.log('value + cmsblock ---------------------' +  value + 'cmsblock' + cmsBlock)
                if (error) {
                  console.error(error)
                  reject(error)
                }
                if (cmsBlock) {
                  console.log('cmsBlock------------------------', cmsBlock)
                  resolve(cmsBlock)
                } else {
                  if (value != undefined) {
                    // console.log('value + cmsblock ---------------------' +  value + 'cmsblock' + cmsBlock)
                    // throw new Error('CMS Block query returned empty results ' + key + ' = ' + value)
                    // reject()
                  } else {
                    console.log('---- value + cmsblock ---------------------' +  value + 'cmsblock' + cmsBlock)
                    // throw new Error('CMS Block query returned empty results ' + key + ' = ' + value)
                    // reject(new Error('CMS Block query returned empty results ' + key + ' = ' + value))
                  }

                }
              }) // .catch((err) => {
                // console.log('catch value + cmsblock ---------------------' +  value)
                // console.error(err)
                // return resolve()
              // })

          } else {
            console.log('get block list')
            dispatch('list', { size: store.state.config.cms_block.max_count, excludeFields, includeFields }).then(cmsblocks => {
              let cmsBlock = cmsblocks.find((itm) => { return itm[key] === value })
              return resolve(cmsBlock)
            })
          } */
        }
      }
    })
  }
}

export default actions
