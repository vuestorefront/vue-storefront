import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import Vue from 'vue';
import { once } from '@vue-storefront/core/helpers'

export const DeviceModule: StorefrontModule = async function ({ router }) {
  once('__VUE_DEVICE_MIXIN__', () => {
    Vue.mixin({
      computed: {
        $device () {
          return this.$root.$deviceRoot;
        }
      }
    })
  })
// router.addRoutes([
//   {
//     name: 'device-mod-test',
//     path: '/device-mod-test',
//     component: () => import(/* webpackChunkName: "device-mod-test" */ './pages/TestMode.vue')
//   }
// ])
}
