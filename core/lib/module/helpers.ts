import { VueStorefrontModuleConfig } from './types'
import { Module } from 'vuex'
import merge from 'lodash-es/merge'
import some from 'lodash-es/some'
import find from 'lodash-es/find'

function doesStoreAlreadyExists (key: string, registeredModules: VueStorefrontModuleConfig[]): boolean {
  registeredModules.forEach(m => {
    if (m.store) {
      if (m.store.modules.some(m => m.key === key)) return true
    }
  })
  return false
}

function mergeStores (
  originalStore: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function },
  extendedStore: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function }
) {
  let mergedArray = []
  originalStore.modules.map(item => {
    mergedArray.push(merge(item, find(extendedStore.modules, { 'key': item.key })));
  })
  extendedStore.modules.map(extendedStoreItem => {
    if (some(originalStore.modules, null, { 'key': extendedStoreItem.key }) === false) {
      mergedArray.push(extendedStoreItem)
    }
  })
  return mergedArray
}

export {
  doesStoreAlreadyExists,
  mergeStores
}
