import { createModule } from '@vue-storefront/core/lib/module'
import moduleRoutes from './router'

const store = {
  namespaced: true,
  state: {
    key: null
  }
}
const KEY = 'amp-renderer'
export const AmpRenderer = createModule({
  key: KEY,
  router: { routes: moduleRoutes },
  store: { modules: [{ key: KEY, module: store }] }
})
