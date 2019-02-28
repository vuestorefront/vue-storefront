import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'droppoint-shipping'
export const DroppointShipping = createModule({
    key: KEY,
    store: { modules: [{ key: KEY, module }] },
})
