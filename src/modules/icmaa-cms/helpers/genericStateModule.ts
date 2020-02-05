import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { registerModule } from '@vue-storefront/core/lib/modules'
import createGenericStore from '../store/generic'

import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import GenericState from '../types/GenericState'

import { Logger } from '@vue-storefront/core/lib/logger'
import camelCase from 'lodash-es/camelCase'

let registeredGenericCmsStateModules: string[] = []

const registerGenericCmsStateModule = (stateKey: string, documentType: string, extendStore?: Module<GenericState, RootState>) => {
  const namespace = 'icmaa-cms-' + stateKey
  const ccNamespace = camelCase(namespace)

  if (registeredGenericCmsStateModules.includes(ccNamespace)) {
    Logger.debug('Generic cms state module is already loaded:', 'icmaa-cms', ccNamespace)()
    return
  }

  const Module: StorefrontModule = function ({ store }) {
    StorageManager.init(namespace)
    store.registerModule(ccNamespace, createGenericStore(stateKey, namespace, documentType, extendStore))

    Logger.debug('Loaded generic cms state module:', 'icmaa-cms', ccNamespace)()
  }

  try {
    registerModule(Module)
    registeredGenericCmsStateModules.push(ccNamespace)
  } catch (exception) {
    Logger.error('Failed to load generic cms state module:', 'icmaa-cms', ccNamespace)()
  }
}

export default registerGenericCmsStateModule
