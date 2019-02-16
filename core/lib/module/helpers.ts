import { VueStorefrontModuleConfig } from './types'

function doesStoreAlreadyExists (key: string, registeredModules: VueStorefrontModuleConfig[]) : boolean {
  registeredModules.forEach(m => {
    if (m.store) {
      if (m.store.modules.some(m => m.key === key)) return true
    }
  })
  return false
}

export {
  doesStoreAlreadyExists
}