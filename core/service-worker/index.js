import '@vue-storefront/core/service-worker/core-service-worker'
import '@vue-storefront/core/modules/offline-order/extends/service-worker'
import 'theme/service-worker/index'

import { skipWaiting, clientsClaim } from 'workbox-core'

skipWaiting()
clientsClaim()
