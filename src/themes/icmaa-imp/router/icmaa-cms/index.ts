import { Logger } from '@vue-storefront/core/lib/logger'
import { routes } from './router'

const NAME_PREFIX = 'icmaa-cms-custom'

// Route components
const DefaultComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page" */ 'src/modules/icmaa-cms/pages/Page.vue')

// Default/fallback route
routes.unshift({
  name: 'icmaa-cms-page', path: '/icmaa-cms-page/:identifier', component: DefaultComponent
})

export const prefixedName = (name: string): string => NAME_PREFIX + '-' + name

export const icmaaCmsRoutes = routes.map((route, index) => {
  if (index === 0) {
    // Skip first route with default/fallback route
    return route
  }

  route.path = '/' + [ NAME_PREFIX, route.name ].join('/') + route.path
  route.name = prefixedName(route.name)

  Logger.log('Registered custom cms route:', 'ICMAA', route)()

  return route
})
