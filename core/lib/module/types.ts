import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import { VueConstructor } from 'vue'
import RootState from '@vue-storefront/core/types/RootState'

export interface VSF {
  Vue?: VueConstructor,
  config?: Record<string, any>,
  store?: Store<RootState>,
  isServer?: boolean
}

export interface VueStorefrontModuleConfig {
  key: string,
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function },
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (VSF: VSF | VueConstructor, config?: Record<string, any>, store?: Store<RootState>, isServer?: boolean) => void,
  afterRegistration?: (VSF: VSF | VueConstructor, config?: Record<string, any>, store?: Store<RootState>, isServer?: boolean) => void
}
