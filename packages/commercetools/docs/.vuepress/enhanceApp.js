import Block from '@vue-storefront/docs/components/Block.vue'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('Block', Block)
  Vue.component('Overview', () => import('@vue-storefront/docs/Overview.vue'))
  Vue.component('ApiClient', () => import('@vue-storefront/docs/ApiClient.vue'))
  Vue.component('Theme', () => import('@vue-storefront/docs/Theme.vue'))
}