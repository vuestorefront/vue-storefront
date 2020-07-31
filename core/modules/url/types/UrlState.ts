import { Route } from 'vue-router';
import { LocalizedRoute } from '@vue-storefront/core/lib/types'

interface UrlModuleRoute extends Partial<Route> {
  scrollPosition?: {
    x: number,
    y: number
  },
  categoryPageSize?: number
}

// This object should represent structure of your modules Vuex state
// It's a good practice is to name this interface accordingly to the KET (for example mailchimpState)
export interface UrlState {
  dispatcherMap: { [path: string]: LocalizedRoute},
  currentRoute: UrlModuleRoute,
  prevRoute: UrlModuleRoute,
  isBackRoute: boolean
}
