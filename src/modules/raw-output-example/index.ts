import { createModule } from '@vue-storefront/core/lib/module'
import { routes } from './router/routes'

const KEY = 'raw-output-example'
export const RawOutputExample = createModule({
  key: KEY,
  router: { routes }
})
