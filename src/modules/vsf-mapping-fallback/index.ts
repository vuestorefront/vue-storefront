import { extendModule } from '@vue-storefront/core/lib/module'
import { Payload } from './types/Payload'

export { Payload }

export const extendMappingFallback = (...fns) => {
  const extendUrlVuex = {
    actions: {
      async mappingFallback (context, payload: Payload) {
        for (const fn of fns) {
          const result = await fn(context, payload);
          if (result) {
            return result
          }
        }
      }
    }
  }
  const urlExtend = {
    key: 'url',
    store: { modules: [{ key: 'url', module: extendUrlVuex }] },
  }
  extendModule(urlExtend)
}
