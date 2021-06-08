import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import Vue from 'vue';
import { once } from '@vue-storefront/core/helpers'
import { createDeviceTests } from './util/createDeviceTests';
import { injectDeviceTests } from './util/injectDeviceTests';
import config from 'config';

if (config.device && config.device.appendToInstance) {
  once('__VUE_DEVICE_MIXIN__', () => {
    Vue.mixin({
      computed: {
        $device () {
          return this.$root.$deviceRoot;
        }
      }
    })
  })
}

const DeviceModule: StorefrontModule = async function ({ router }) {
  // router.addRoutes([
  //   {
  //     name: 'device-mod-test',
  //     path: '/device-mod-test',
  //     component: () => import(/* webpackChunkName: "device-mod-test" */ './pages/TestMode.vue')
  //   }
  // ])
}

export {
  createDeviceTests,
  injectDeviceTests,
  DeviceModule
}
