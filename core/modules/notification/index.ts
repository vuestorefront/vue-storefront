import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'notification'
export const Notification = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
})