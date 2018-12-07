
// Always prefetch for offline capabilities
export const Checkout = () => import(/* webpackChunkName: "checkout"  */ 'theme/pages/Checkout.vue')
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    Checkout()
  })
}
// group non-sritical routes into one bundle to limit network requests
export const Compare = () => import(/* webpackChunkName: "lazy-routes" */ 'theme/pages/Compare.vue')
export const MyAccount = () => import(/* webpackChunkName: "lazy-routes" */ 'theme/pages/MyAccount.vue')
export const Static = () => import(/* webpackChunkName: "lazy-routes" */ 'theme/pages/Static.vue')
export const CustomCmsPage = () => import(/* webpackChunkName: "lazy-routes" */ 'theme/pages/CustomCmsPage.vue')
export const CmsData = () => import(/* webpackChunkName: "lazy-routes" */ 'src/modules/magento-2-cms/components/CmsData')
